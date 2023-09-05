const bcrypt = require('bcrypt')
const HttpStatusEnum = require('../utils/http-status')
const UserService = require('../services/user-service')
const UserTokenService = require('../services/token-service')
const generateTokens = require('../utils/generate-tokens');

module.exports.signup = async (req, res) => {
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;

        // console.log(req.body);

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            const err = new Error('All input is required')
            err.status = 400;
            throw err;
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await UserService.getUser({ email: email });

        if (oldUser) {
            const err = new Error('User with given email already exist')
            err.status = 409;
            throw err;
        }

        // Create user in our database
        await UserService.createUser({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: password,
        });

        // return new user
        res.status(201).json({
            message: "Account created sucessfully"
        });
    } catch (err) {
        //console.log(err);
        res.status(err.status).json({
            status: err.status,
            error: HttpStatusEnum.get(err.status).name,
            message: err.message,
        });
    }
};

module.exports.login = async (req, res) => {
    // Get user input
    const { email, password } = req.body;

    //console.log(req.body);

    try {

        // Validate user input
        if (!(email && password)) {
            //return res.status(400).json({ status: 400, message: "All input is required" });
            const err = new Error('All input is required')
            err.status = 400;
            throw err;
        }

        // Validate if user exist in our database
        const user = await UserService.getUser({ email: email });

        if (!user) {
            const err = new Error('User not found')
            err.status = 400;
            throw err;
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const { token, refreshToken } = await generateTokens(user);

            // user
            return res.json({
                "id": user._id,
                token,
                "refresh_token": refreshToken,
            });
        }
        res.status(400).json({ status: 400, message: "Invalid Credentials" });
    } catch (err) {
        console.log(err);
        res.status(err.status).json({
            status: err.status,
            error: HttpStatusEnum.get(err.status).name,
            message: err.message,
        });
    }
}

module.exports.logout = async (req, res) => {
    try {
        const { refresh_token: refreshToken } = req.body;

        if (!refreshToken)
            return res.status(400).json({ status: 400, message: "Invalid Credentials" });

        const userToken = await UserTokenService.getUserToken({ refreshToken });

        if (!userToken)
            return res
                .status(200)
                .json({ message: "Logged Out Sucessfully" })


        await UserTokenService.removeUserToken(userToken);
        return res.status(200).json({ message: "Logged Out Sucessfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}