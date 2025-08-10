const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const { createOrder, getUserOrders, getAllOrders, markAsPaid, markAsDelivered, deleteOrder } = require('../controllers/orderController');

const router = express.Router();

router.post('/',authMiddleware ,createOrder)
router.get('/myorders',authMiddleware , getUserOrders);


router.get('/all',authMiddleware , adminMiddleware , getAllOrders);
router.put('/:id/pay',authMiddleware , markAsPaid);
router.put('/:id/deliver',authMiddleware, adminMiddleware , markAsDelivered);
router.delete('/:id/delete' , authMiddleware , adminMiddleware , deleteOrder)



module.exports = router;