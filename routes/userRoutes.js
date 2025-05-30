const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints de autenticação e registro de usuários
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Cadastrar novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Drauzio Dominik
 *               email:
 *                 type: string
 *                 format: email
 *                 example: drauzio@qa.com
 *               password:
 *                 type: string
 *                 example: teste123
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário registrado com sucesso!
 *       400:
 *         description: Erro na requisição (validação ou duplicidade)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               senha-curta:
 *                 summary: Senha muito curta
 *                 value:
 *                   message: A senha deve ter no mínimo 6 caracteres.
 *               email-existente:
 *                 summary: E-mail já registrado
 *                 value:
 *                   message: Este e-mail já está registrado.
 *               campos-invalidos:
 *                 summary: Campos faltando
 *                 value:
 *                   message: Preencha todos os dados corretamente.
 *               email-invalido:
 *                 summary: E-mail inválido
 *                 value:
 *                   message: Email inválido.
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro ao registrar usuário
 *
 * /api/users/login:
 *   post:
 *     summary: Fazer login de usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: drauzio@qa.com
 *               password:
 *                 type: string
 *                 example: teste123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login bem-sucedido
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *       400:
 *         description: Campos inválidos ou em branco
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               senha-curta:
 *                 summary: Senha muito curta
 *                 value:
 *                   message: A senha deve ter no mínimo 6 caracteres.
 *               email-invalido:
 *                 summary: E-mail inválido
 *                 value:
 *                   message: Email inválido.
 *               campos-vazios:
 *                 summary: Campos obrigatórios ausentes
 *                 value:
 *                   message: Preencha todos os dados corretamente.
 *       401:
 *         description: E-mail ou senha incorretos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email ou senha incorretos.
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro ao fazer login.
 */

    
router.post('/register', userController.register);
router.post('/login', userController.login);
router.delete('/:id', userController.deleteUser);
module.exports = router;
