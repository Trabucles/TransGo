// viajesController.js
const db = require('../db'); // Asume que tienes un archivo que maneja la conexión con MySQL

// Obtener todos los viajes
const getAllViajes = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM viajes');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los viajes:', error);
    res.status(500).send('Error al obtener los viajes');
  }
};

module.exports = {
  getAllViajes,
};

