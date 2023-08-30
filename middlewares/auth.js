const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = process.env;

const verifyToken = (req, res, next) => {
    //  const token = req.header('Authorization').replace('Bearer ', '')
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({
            status: 403,
            error: HttpStatusEnum.get(403).name,
            message: 'A token is required for authentication!',
        });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        res.status(401).json({
            status: err.status,
            error: HttpStatusEnum.get(401).name,
            message: 'Unauthorized!',
        });
    }
    return next();
};

module.exports = verifyToken;