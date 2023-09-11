const express = require('express');
const verifyToken = require('../middlewares/auth');

const router = express.Router();
const userController = require('../controllers/user-controller');

// User
router.get('/me', verifyToken, userController.me);

module.exports = router;