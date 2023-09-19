const express = require('express');

const router = express.Router();
const productController = require('../controllers/product-controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *           description: The id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         price:
 *           type: integer
 *           description: The product price
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The product created date
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The product created date
 *       example:
 *         name: The New Turing Omnibus
 *         price: 100
 */

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: The product managing API
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */
router.post('/', productController.createProduct); // api/products

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get product list
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */
router.get('/', productController.getProducts); // api/products

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', productController.getProduct); // api/products/123

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', productController.updateProduct); // api/products/123

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', productController.deleteProduct); // api/products/123

module.exports = router;