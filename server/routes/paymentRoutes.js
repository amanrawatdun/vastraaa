const express = require('express');
const { createPaymentOrder, verifyPayment } = require('../controllers/paymentController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// This route requires user authentication because it's initiated by the client.
router.post('/create-order', authMiddleware, createPaymentOrder);

// This route should NOT have authMiddleware.
// It is a server-to-server endpoint used for cryptographic signature verification.
// The security check is the signature itself, not the user's session.
router.post('/verify', verifyPayment);

module.exports = router;