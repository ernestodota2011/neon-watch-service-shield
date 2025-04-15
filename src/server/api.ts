// Este archivo simula una API del lado del servidor
// En un proyecto real, estos endpoints se implementarían en un servidor backend separado

import { query } from '../lib/db';

/**
 * Obtener todos los servicios
 * @returns Lista de servicios desde la base de datos
 */
export async function getServices() {
  try {
    // Consulta SQL para obtener todos los servicios
    const sql = `
      SELECT 
        id, 
        name, 
        status, 
        uptime, 
        last_check AS lastCheck
      FROM services
    `;
    
    const services = await query(sql);
    return services;
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    throw error;
  }
}

/**
 * Obtener un servicio por ID
 * @param id - ID del servicio a obtener
 * @returns Servicio encontrado o null
 */
export async function getServiceById(id: number) {
  try {
    const sql = `
      SELECT 
        id, 
        name, 
        status, 
        uptime, 
        last_check AS lastCheck
      FROM services 
      WHERE id = ?
    `;
    
    const services = await query(sql, [id]);
    return services.length > 0 ? services[0] : null;
  } catch (error) {
    console.error(`Error al obtener servicio con ID ${id}:`, error);
    throw error;
  }
}

/**
 * Actualizar el estado de un servicio
 * @param id - ID del servicio a actualizar
 * @param status - Nuevo estado ('up' o 'down')
 * @returns Resultado de la operación
 */
export async function updateServiceStatus(id: number, status: 'up' | 'down') {
  try {
    const sql = `
      UPDATE services 
      SET status = ?, 
          last_check = NOW() 
      WHERE id = ?
    `;
    
    const result = await query(sql, [status, id]);
    return result;
  } catch (error) {
    console.error(`Error al actualizar estado del servicio con ID ${id}:`, error);
    throw error;
  }
}

/**
 * Actualizar el tiempo de actividad de un servicio
 * @param id - ID del servicio a actualizar
 * @param uptime - Nuevo tiempo de actividad
 * @returns Resultado de la operación
 */
export async function updateServiceUptime(id: number, uptime: string) {
  try {
    const sql = `
      UPDATE services 
      SET uptime = ? 
      WHERE id = ?
    `;
    
    const result = await query(sql, [uptime, id]);
    return result;
  } catch (error) {
    console.error(`Error al actualizar uptime del servicio con ID ${id}:`, error);
    throw error;
  }
}
