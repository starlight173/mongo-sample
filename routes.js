const express = require('express');
const verifyToken = require('./middlewares/auth');

const router = express.Router();
const authController = require('./controllers/auth-controller');
const tokenController = require('./controllers/token-controller');

// Auth
// Định nghĩa các route và kết nối với phương thức xử lý tương ứng trong controller
router.post('/auth/signup', authController.signup);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);

// refresh token
router.post('/refreshToken', tokenController.refreshToken);

module.exports = router;