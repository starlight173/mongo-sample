const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    price: Number,
    createdAt: { /* can declare property type with an object like this because we need 'default' */
        type: Date,
        default: new Date()
    },
    updatedAt: { /* can declare property type with an object like this because we need 'default' */
        type: Date,
        default: new Date()
    }
});
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;