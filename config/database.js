const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

const { MONGO_URI } = process.env;

exports.connect = () => {
    // Connecting to the database
    mongoose
        .connect(MONGO_URI, {
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
