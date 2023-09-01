const express = require('express');
const router = express.Router();
const authController = require('./controllers/auth-controller');
const userController = require('./controllers/user-controller');
const productController = require('./controllers/product-controller');

// Auth
// Định nghĩa các route và kết nối với phương thức xử lý tương ứng trong controller
router.post('/auth/login', authController.login);

// User
router.post('/user/register', userController.createUser);

// Product
router.post('/products', productController.createProduct); // api/products
router.get('/products', productController.getProducts); //api/products
router.get('/products/:productID', productController.getProduct);
router.put('/products/:productID', productController.updateProduct);
router.delete('/products/:productID', productController.deleteProduct);

module.exports = router;