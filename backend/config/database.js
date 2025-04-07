const mysql = require('mysql2');

// Configuración de la base de datos
const pool = mysql.createPool({
  host: 'localhost',        // O la IP del servidor donde esté MySQL
  user: 'root',             // Tu usuario de MySQL
  password: 'Amoamishijos@',// Tu contraseña de MySQL
  database: 'transgo'    // El nombre de la base de datos
});

// Exportar la conexión
module.exports = pool.promise();
