const jwt = require('jsonwebtoken');
const registerSchema = require('../schemas/registerSchema')
const loginSchema = require('../schemas/loginSchema')
const userModel = require('../models/userModel');
const deleteUserSchema = require('../schemas/deleteUserSchema');

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

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      message: 'Login bem-sucedido',
      token,
      role: user.role,
      name: user.name
    });

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const { error } = deleteUserSchema.validate({ id });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const user = await userModel.findUserById(Number(id));
    if (!user) {
      return res.status(404).json({ message: 'Usuário não existe.' });
    }
    await userModel.deleteUser(Number(id));
    return res.status(200).json({ message: 'Usuário deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return res.status(500).json({ message: 'Erro ao deletar usuário.' });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await userModel.findAllUsers();
    const usersFormatted = users.map(user => ({
      ...user,
      createdAt: user.createdAt.toLocaleString('pt-BR'),
      updatedAt: user.updatedAt.toLocaleString('pt-BR')
    }));
    return res.json(usersFormatted);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar usuários.' });
  }
};