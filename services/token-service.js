const UserToken = require('../models/user-token-model');

exports.getUserToken = async (o) => {
    return await UserToken.findOne(o);
}

exports.createUserToken = async o => {
    return await UserToken(o).save();
}

exports.removeUserToken = async o => {
    return await UserToken.deleteOne(o)
}