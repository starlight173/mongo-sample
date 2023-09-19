const User = require('../models/user');

exports.getUser = async (o) => {
    return await User.findOne(o);
}

exports.createUser = async user => {
    return await User.create(user);
}