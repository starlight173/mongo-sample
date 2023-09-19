const Product = require('../models/product');

exports.createProduct = async function (product) {
    return await Product.create(product);
}

exports.getProducts = async function () {
    return await Product.find();
}

exports.getProduct = async function (id) {
    return await Product.findById(id);
}

exports.updateProduct = async function (id, updatedData) {
    return await Product.findByIdAndUpdate(
        id, updatedData
    )
}

exports.deleteProduct = async function (id) {
    return await Product.findByIdAndDelete(id);
}

