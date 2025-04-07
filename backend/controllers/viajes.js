// controllers/viajes.js
const pool = require('../config/database');

exports.getViajes = async (req, res) => {
  try {
    // Realizamos el JOIN para obtener la información de viajes
    const [rows, fields] = await pool.execute(`
      SELECT 
          viajes.id AS viaje_id, 
          rutas.numeroRuta AS ruta, 
          conductores.nombreCompleto AS conductor,
          autobuses.marca AS autobus_marca,
          autobuses.numero_autobus AS autobus_numero,
          viajes.hora_salida, 
          viajes.hora_llegada
      FROM 
          viajes
      JOIN 
          rutas ON viajes.ruta_id = rutas.id
      JOIN 
          conductores ON viajes.conductor_id = conductores.id
      JOIN 
          autobuses ON viajes.autobus_id = autobuses.id
    `);

    // Retornamos los datos como respuesta
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la consulta de viajes' });
  }
};
