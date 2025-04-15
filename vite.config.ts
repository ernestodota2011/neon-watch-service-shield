import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { apiHandlers } from "./src/server";

// Middleware para manejar los endpoints de la API
const apiMiddleware = () => {
  return {
    name: 'api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0] || '';
        
        if (url.startsWith('/api/')) {
          // Extraer método y ruta
          const method = req.method || 'GET';
          
          // Buscar handler correspondiente
          let matchedHandler = null;
          let params = {};
          
          for (const handlerKey of Object.keys(apiHandlers)) {
            const [handlerMethod, handlerRoute] = handlerKey.split(' ');
            
            if (method !== handlerMethod) continue;
            
            // Convertir ruta a regex para manejar parámetros dinámicos
            const paramPattern = /:([^/]+)/g;
            const regexParts = handlerRoute.split('/')
              .map(part => {
                if (part.startsWith(':')) {
                  return '([^/]+)';
                }
                return part;
              })
              .join('\\/');
            
            const regex = new RegExp(`^${regexParts}$`);
            const urlParts = url.split('/');
            const routeParts = handlerRoute.split('/');
            
            if (regex.test(url)) {
              matchedHandler = apiHandlers[handlerKey];
              
              // Extraer parámetros de la URL
              for (let i = 0; i < routeParts.length; i++) {
                if (routeParts[i].startsWith(':')) {
                  const paramName = routeParts[i].substring(1);
                  params[paramName] = urlParts[i];
                }
              }
              
              break;
            }
          }
          
          if (matchedHandler) {
            // Parsear el cuerpo de la solicitud si es necesario
            if (method === 'POST' || method === 'PUT') {
              let bodyData = '';
              for await (const chunk of req) {
                bodyData += chunk;
              }
              
              if (bodyData) {
                try {
                  req.body = JSON.parse(bodyData);
                } catch (e) {
                  console.error('Error parsing request body:', e);
                }
              }
            }
            
            // Añadir parámetros a la solicitud
            req.params = params;
            
            // Preparar respuesta
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            
            const json = (data) => {
              res.end(JSON.stringify(data));
            };
            
            res.json = json;
            res.status = (code) => {
              res.statusCode = code;
              return res;
            };
            
            try {
              await matchedHandler(req, res);
            } catch (error) {
              console.error('Error executing API handler:', error);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
            
            return;
          }
        }
        
        next();
      });
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    apiMiddleware(), // Añadir middleware para endpoints API
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
