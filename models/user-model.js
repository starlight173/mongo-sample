const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const validator = require('validator')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { JWT_SECRET_KEY } = process.env;

const UserSchema = new Schema({
    first_name: {
        type: String,
        trim: true,
        default: null,
    },
    last_name: {
        type: String,
        trim: true,
        default: null,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid Email address' })
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    created_at: {
        type: Date,
        default: new Date(),
    },
});

UserSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign(
        { user_id: user._id, email: user.email },
        JWT_SECRET_KEY,
        {
            expiresIn: "2h",
        }
    );
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}


const User = mongoose.model('User', UserSchema);
module.exports = User;