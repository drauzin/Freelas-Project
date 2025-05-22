const express = require('express');
const router = express.Router();

const offerController = require('../controllers/offerController');

router.post('/', offerController.createOffer);
router.get('/', offerController.getAllOffers);

module.exports = router;
