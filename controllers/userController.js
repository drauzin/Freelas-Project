const jwt = require('jsonwebtoken');
const db = require('../config/db');
const registerSchema = require('../schemas/registerSchema')
const loginSchema = require('../schemas/loginSchema')

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = registerSchema.validate({ name, email, password });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {

     const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    // Verifica se o usuário já existe
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Este e-mail já está registrado.' });
    }
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    await db.query(sql, [name, email, password]);
    

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    console.error('Erro no registro:', err);
    res.status(500).json({ message: 'Erro ao registrar usuário' });


  }
};


// Login de usuário

  exports.login = async (req, res) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({email, password });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }


  try {
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0 || users[0].password !== password) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

 const user = users[0]; 
 
 const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Retorna mensagem e token
    return res.status(200).json({
      message: 'Login bem-sucedido',
      token
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};

