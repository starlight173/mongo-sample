const User = require('../models/user');

exports.getUser = async function (email) {
    return await User.findOne(email);
}

exports.createUser = async function (user) {
    return await User.create(user);
}


