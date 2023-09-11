const jwt = require("jsonwebtoken");
const HttpStatusEnum = require('../utils/http-status')
const UserService = require('../services/user-service')

const { JWT_ACCESS_TOKEN_KEY } = process.env;

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')

    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_ACCESS_TOKEN_KEY);
        req.userId = decoded.id
        next();
    } catch (err) {
        res.status(401).json({
            status: `error`,
            message: 'Unauthorized!',
        });
    }
};

module.exports = verifyToken;