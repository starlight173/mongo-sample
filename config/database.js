const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

exports.connect = () => {
    // Connecting to the database
    mongoose
        .connect(uri, {
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
