const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const verifyToken    = require('../middlewares/authMiddleware');


/**
 * @swagger
 * tags:
 *   name: Ofertas
 *   description: Endpoints para criação e listagem de ofertas de serviço
 */


/**
 * @swagger
 * /api/offers:
 *   post:
 *     summary: Oferecer um novo serviço (freelancer)
 *     tags: [Ofertas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: Design de logo profissional
 *               description:
 *                 type: string
 *                 example: Criação de logotipo moderno para startups
 *     responses:
 *       201:
 *         description: Serviço oferecido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Oferta criada com sucesso!
 *                 offerId:
 *                   type: integer
 *                   example: 15
 *       400:
 *         description: Validação falhou (campos obrigatórios ou tamanho mínimo)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: O título deve ter ao menos 6 caracteres.
 *       401:
 *         description: Token não fornecido ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token não fornecido ou inválido.
 *       500:
 *         description: Erro interno ao criar oferta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro interno ao criar oferta.
 */

/**
 * @swagger
 * /api/offers:
 *   get:
 *     summary: Listar todas as ofertas de serviço
 *     tags: [Ofertas]
 *     responses:
 *       200:
 *         description: Lista de ofertas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 15
 *                   title:
 *                     type: string
 *                     example: Design de logo profissional
 *                   description:
 *                     type: string
 *                     example: Criação de logotipo moderno para startups
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: '2025-05-23T14:00:00Z'
 *                   userId:
 *                     type: integer
 *                     example: 3
 *                   userName:
 *                     type: string
 *                     example: Ana Souza
 *       500:
 *         description: Erro interno ao buscar ofertas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro interno ao buscar ofertas.
 */

router.get('/', offerController.getAllOffers);
router.post('/', verifyToken, offerController.createOffer);
module.exports = router;
