// config/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',     // ou seu host real
  user: 'root',          // seu usuário
  password: '',          // sua senha
  database: 'freelasdb'  // seu banco
});

module.exports = pool;
