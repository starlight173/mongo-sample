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
            "status": "success",
            "data": {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            }
        })

    } catch (err) {
        const errStatus = err.status || 500;
        const errMessage = err.message || "Internal Server Error";
        res.status(errStatus).json({
            status: `error`,
            message: errMessage,
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