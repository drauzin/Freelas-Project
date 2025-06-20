const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const bookingController = require('../controllers/bookingController');

router.post('/', verifyToken, bookingController.createBooking);
router.get('/', verifyToken, bookingController.listBookings);

module.exports = router;
