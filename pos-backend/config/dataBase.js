const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.databaseURI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error MongoDb:  ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
