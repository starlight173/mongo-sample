const Product = require('../models/product-model');

exports.createProduct = async function (product) {
    return await Product.create(product);
}
