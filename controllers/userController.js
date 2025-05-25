const jwt = require('jsonwebtoken');
const db = require('../config/db');
const registerSchema = require('../schemas/registerSchema')
const loginSchema = require('../schemas/loginSchema')
const userModel = require('../models/userModel');

 exports.register = async (req, res) => {
 const { name, email, password } = req.body;
 const { error } = registerSchema.validate({ name, email, password });
 const existingUser = await userModel.findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'E-mail já cadastrado.' });
  }
  await userModel.createUser(name, email, password);
  return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
};


// Login de usuário

  exports.login = async (req, res) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = await userModel.findUserByEmail(email);

    // Verifica se usuário existe e se senha está correta (sem criptografia por enquanto)
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      message: 'Login bem-sucedido',
      token
    });

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};