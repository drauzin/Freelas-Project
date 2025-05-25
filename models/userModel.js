const db = require('../config/db');

exports.findUserByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

exports.createUser = async (name, email, password) => {
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  await db.execute(sql, [name, email, password]);
};

exports.updateProfile = async (id, name, email) => {
  const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  await db.execute(sql, [name, email, id]);
};
