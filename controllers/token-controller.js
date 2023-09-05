const jwt = require("jsonwebtoken");
const verifyRefreshToken = require('../utils/verify-refresh-tokens')
const {
    JWT_ACCESS_TOKEN_KEY,
    JWT_REFRESH_TOKEN_KEY
} = process.env;

module.exports.refreshToken = async (req, res) => {
    const { refresh_token: refreshToken } = req.body;

    if (!refreshToken)
        return res.status(400).json({ status: 400, message: "Invalid Credentials" });

    try {
        const { tokenDetails } = await verifyRefreshToken(refreshToken);

        const payload = { _id: tokenDetails.id, email: tokenDetails.email };

        const token = jwt.sign(
            payload,
            JWT_ACCESS_TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        const newRefreshToken = jwt.sign(
            payload,
            JWT_REFRESH_TOKEN_KEY,
            { expiresIn: "30d" }
        );

        return res.json({
            token,
            "refresh_token": newRefreshToken,
        });
    } catch (err) {
        return res.status(400).json(err);
    }
}