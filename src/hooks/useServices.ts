import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// Definir la interfaz para un servicio
export interface Service {
  id: number;
  name: string;
  status: 'up' | 'down';
  uptime: string;
  lastCheck: string;
}

/**
 * Hook para obtener los servicios desde la API
 */
export function useServices() {
  // Usar react-query para gestionar la caché y la actualización de datos
  return useQuery<Service[], Error>({
    queryKey: ['services'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching services:', error);
        
        // En caso de error, devolver datos de fallback para desarrollo
        return [
          {
            id: 1,
            name: "API Server",
            status: "up" as const,
            uptime: "99.9%",
            lastCheck: "2 min ago",
          },
          {
            id: 2,
            name: "Database",
            status: "up" as const,
            uptime: "99.7%",
            lastCheck: "1 min ago",
          },
          {
            id: 3,
            name: "Web Server",
            status: "down" as const,
            uptime: "98.5%",
            lastCheck: "Just now",
          },
        ];
      }
    },
    refetchInterval: 30000, // Actualizar datos cada 30 segundos
  });
}
