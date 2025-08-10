const express = require('express');
const { adminMiddleware, authMiddleware } = require('../middleware/authMiddleware');
const { getSummary, getAllUser, deleteUser } = require('../controllers/adminController');
const router = express.Router();

router.get('/summary', authMiddleware , adminMiddleware , getSummary);
router.get('/alluser',authMiddleware , adminMiddleware , getAllUser)
router.delete('/user/:id',authMiddleware , adminMiddleware,deleteUser)

module.exports = router;