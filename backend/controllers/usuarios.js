const pool = require('../config/database'); // Conexión a la base de datos

// Ruta para login de usuario
const login = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const [rows] = await pool.execute('SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?', [correo, contrasena]);

    if (rows.length > 0) {
      res.json({ message: 'Login exitoso', user: rows[0] });
    } else {
      res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al intentar iniciar sesión', error });
  }
};

module.exports = { login };
