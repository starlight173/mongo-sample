const HttpStatusEnum = require('../utils/http_status')
const UserService = require('../services/user_service')

module.exports.createUser = async (req, res) => {
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
            const err = new Error('User Already Exist. Please Login')
            err.status = 409;
            throw err;
        }

        // Create user in our database
        const user = await UserService.createUser({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: password,
        });

        // Create token
        await user.generateAuthToken();

        // return new user
        res.status(201).json({
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            created_at: user.created_at,

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

// status: 'success',
// message: 'User Registered!',
// data: {
//     user: {
//         email: user.email,
//     },
// },