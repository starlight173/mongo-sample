const jwt = require("jsonwebtoken");
const {
    JWT_ACCESS_TOKEN_KEY,
    JWT_REFRESH_TOKEN_KEY
} = process.env;

const generateTokens = async (user) => {
    const token = jwt.sign(
        { id: user._id, email: user.email },
        JWT_ACCESS_TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );
    return token;
};

module.exports = generateTokens;