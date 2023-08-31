const mongoose = require('mongoose');

const {
    MONGODB_HOST,
    MONGODB_DATABASE,
    MONGODB_PORT,
} = process.env;

exports.connect = () => {
    // Connecting to the database
    mongoose
        .connect(`mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoCreate: true,
            autoIndex: true,
        })
        .then(() => {
            console.log("Successfully connected to mongo database");
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });;
};
