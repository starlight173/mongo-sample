const HttpStatusEnum = require('../utils/http-status')
const UserService = require('../services/user-service')

module.exports.me = async (req, res) => {
    try {
        const user = await UserService.getUser({ _id: req.userId })

        if (!user) {
            const err = new Error('User not found')
            err.status = 400;
            throw err;
        }

        res.json({
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
        });
    } catch (err) {
        res.status(err.status).json({
            status: err.status,
            error: HttpStatusEnum.get(err.status).name,
            message: err.message,
        });
    }
}

// status: 'success',
// message: 'User Registered!',
// data: {
//     user: {
//         email: user.email,
//     },
// },