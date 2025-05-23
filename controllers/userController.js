
// Cadastro de usuário
const db = require('../config/db');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');


// Definindo o schema de validação
const schema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-zÀ-ÿ\s]+$/)
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.pattern.base': 'O nome deve conter apenas letras e espaços.',
      'string.empty': 'Preencha todos dados corretamente.',
      'any.required': 'Preencha todos dados corretamente.',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email inválido.',
      'string.empty': 'Preencha todos dados corretamente.',
      'any.required': 'Preencha todos dados corretamente.',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'A senha deve ter no mínimo 6 caracteres.',
      'string.empty': 'Preencha todos dados corretamente.',
      'any.required': 'Preencha todos dados corretamente.',
    }),
});

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // Validação
  const { error } = schema.validate({ name, email, password });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {

     const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    // Fazemos uma consulta no banco de dados para verificar se o email já existe.
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

   try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

    
  const token = jwt.sign(
      { id: user.id, email: user.email }, //vamos usar o JWT para gerar um token de autenticação
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
  )
    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};
