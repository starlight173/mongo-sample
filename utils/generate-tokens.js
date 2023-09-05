const UserTokenService = require("../services/token-service");
const jwt = require("jsonwebtoken");
const {
    JWT_ACCESS_TOKEN_KEY,
    JWT_REFRESH_TOKEN_KEY
} = process.env;

const generateTokens = async (user) => {
    const payload = { id: user._id, email: user.email };

    const token = jwt.sign(
        payload,
        JWT_ACCESS_TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );

    const refreshToken = jwt.sign(
        payload,
        JWT_REFRESH_TOKEN_KEY,
        { expiresIn: "30d" }
    );
    await UserTokenService.createUserToken({ userId: user._id, token: token });
    return { token, refreshToken };
};

module.exports = generateTokens;