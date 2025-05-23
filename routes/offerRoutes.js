const express = require('express');
const router = express.Router();

const offerController = require('../controllers/offerController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/', verifyToken, offerController.createOffer);
router.get('/', offerController.getAllOffers);

module.exports = router;
