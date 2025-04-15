import { getServices, getServiceById, updateServiceStatus, updateServiceUptime } from './api';

/**
 * Configuración de las rutas API para el servidor
 * 
 * Este archivo está pensado para ser usado con un middleware de Vite o Express
 * que exponga estos endpoints durante el desarrollo o producción
 */

// Definir controladores para cada endpoint
export const apiHandlers = {
  // GET /api/services - Obtener todos los servicios
  'GET /api/services': async (req: any, res: any) => {
    try {
      const services = await getServices();
      return res.json(services);
    } catch (error) {
      console.error('Error en GET /api/services:', error);
      return res.status(500).json({ error: 'Error al obtener servicios' });
    }
  },

  // GET /api/services/:id - Obtener un servicio por ID
  'GET /api/services/:id': async (req: any, res: any) => {
    try {
      const id = parseInt(req.params.id);
      const service = await getServiceById(id);
      
      if (!service) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }
      
      return res.json(service);
    } catch (error) {
      console.error(`Error en GET /api/services/${req.params.id}:`, error);
      return res.status(500).json({ error: 'Error al obtener el servicio' });
    }
  },

  // PUT /api/services/:id/status - Actualizar estado de un servicio
  'PUT /api/services/:id/status': async (req: any, res: any) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (status !== 'up' && status !== 'down') {
        return res.status(400).json({ error: 'Estado inválido. Debe ser "up" o "down"' });
      }
      
      const result = await updateServiceStatus(id, status);
      return res.json({ success: true, result });
    } catch (error) {
      console.error(`Error en PUT /api/services/${req.params.id}/status:`, error);
      return res.status(500).json({ error: 'Error al actualizar el estado del servicio' });
    }
  },

  // PUT /api/services/:id/uptime - Actualizar uptime de un servicio
  'PUT /api/services/:id/uptime': async (req: any, res: any) => {
    try {
      const id = parseInt(req.params.id);
      const { uptime } = req.body;
      
      const result = await updateServiceUptime(id, uptime);
      return res.json({ success: true, result });
    } catch (error) {
      console.error(`Error en PUT /api/services/${req.params.id}/uptime:`, error);
      return res.status(500).json({ error: 'Error al actualizar el uptime del servicio' });
    }
  }
};
