const bcrypt = require('bcrypt')
const HttpStatusEnum = require('../utils/http_status')
const UserService = require('../services/user_service')

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
            const token = await user.generateAuthToken();

            // user
            return res.status(200).json({
                "user_id": user._id,
                token
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

