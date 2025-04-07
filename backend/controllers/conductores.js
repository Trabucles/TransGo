const pool = require('../config/database');

// Obtener todos los conductores
exports.getAllConductores = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM conductores');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener conductores' });
  }
};

// Obtener un conductor por ID
exports.getConductorById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM conductores WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Conductor no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener conductor' });
  }
};

// Crear un nuevo conductor
exports.createConductor = async (req, res) => {
  const { nombre, contrasena } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO conductores (nombre, contrasena) VALUES (?, ?)', [nombre, contrasena]);
    res.status(201).json({ id: result.insertId, nombre, contrasena });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear conductor' });
  }
};

// Actualizar un conductor
exports.updateConductor = async (req, res) => {
  const { id } = req.params;
  const { nombre, contrasena } = req.body;
  try {
    const [result] = await pool.query('UPDATE conductores SET nombre = ?, contrasena = ? WHERE id = ?', [nombre, contrasena, id]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Conductor actualizado' });
    } else {
      res.status(404).json({ message: 'Conductor no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar conductor' });
  }
};

// Eliminar un conductor
exports.deleteConductor = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM conductores WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Conductor eliminado' });
    } else {
      res.status(404).json({ message: 'Conductor no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar conductor' });
  }
};

