require("dotenv").config();

const config = Object.freeze({
    port: process.env.PORT || 3000,
    databaseURI: process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase",
    nodeEnv: process.env.NODE_ENV || "development",
    accesTokenSecret: process.env.JWT_SECRET || "defaultSecretKey",
    client_id: process.env.PAYPAL_CLIENT_ID || "default",
    client_secret: process.env.PAYPAL_CLIENT_SECRET || "default",
    payPayWeebHookId: process.env.PAYPAL_WEBHOOK_ID || "default",
});

module.exports = config;