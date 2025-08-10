const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register' , registerUser)

router.post('/login' , loginUser);

// router.get('/alluser' , getAllUser)



module.exports =router;