const express = require('express');
const verifyToken = require('./middlewares/auth');

const router = express.Router();
const authController = require('./controllers/auth-controller');
const userController = require('./controllers/user-controller');
const tokenController = require('./controllers/token-controller');
const productController = require('./controllers/product-controller');

// Auth
// Định nghĩa các route và kết nối với phương thức xử lý tương ứng trong controller
router.post('/auth/signup', authController.signup);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);

// refresh token
router.post('/refreshToken', tokenController.refreshToken);

// User
router.get('/users/me', verifyToken, userController.me);

// Product
router.post('/product', productController.createProduct); // api/product
router.get('/products', productController.getProducts); // api/products
router.get('/products/:id', productController.getProduct); // api/products/123
router.patch('/products/:id', productController.updateProduct); // api/products/123
router.delete('/products/:id', productController.deleteProduct); // api/products/123

module.exports = router;