const UserTokenService = require("../services/token-service");
const jwt = require("jsonwebtoken");
const {
    JWT_REFRESH_TOKEN_KEY
} = process.env;

const verifyRefreshToken = async (refreshToken) => {

    const userToken = await UserTokenService.getUserToken({ token: refreshToken });

    if (!userToken) {
        throw Error("Invalid refresh token");
    }

    const tokenDetails = await jwt.verify(refreshToken, JWT_REFRESH_TOKEN_KEY);

    return {
        tokenDetails,
        message: "Valid refresh token",
    }
};

module.exports = verifyRefreshToken;