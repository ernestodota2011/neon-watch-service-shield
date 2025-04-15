import mysql from 'mysql2/promise';

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: '5.189.151.27',
  port: 3306,
  user: 'root',
  password: 'ernestodota2011',
  database: 'servicewatch'
};

// Crear un pool de conexiones
const pool = mysql.createPool(dbConfig);

/**
 * Ejecuta una consulta SQL y devuelve los resultados
 * @param sql - Consulta SQL a ejecutar
 * @param params - Parámetros para la consulta (opcional)
 * @returns Resultado de la consulta
 */
export async function query(sql: string, params?: any[]) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Error ejecutando la consulta SQL:', error);
    throw error;
  }
}

/**
 * Comprueba la conexión a la base de datos
 * @returns true si la conexión es exitosa, false en caso contrario
 */
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    connection.release();
    return true;
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    return false;
  }
}

export default {
  query,
  testConnection
};
