const Product = require('../models/product');

exports.createProduct = async function (product) {
    return await Product.create(product);
}
