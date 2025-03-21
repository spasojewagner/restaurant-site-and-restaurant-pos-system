const config = require("../config/config"); 
const createHttpError = require("http-errors");
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");

const isVerifedUser = async (req, res, next) => {
    try {
        const { accesToken } = req.cookies;

        if (!accesToken) {
            return next(createHttpError(401, "Please provide token"));
        }

        const decodeToken = jwt.verify(accesToken, config.accesTokenSecret);
        const user = await User.findById(decodeToken._id);

        if (!user) {
            return next(createHttpError(401, "User does not exist"));
        }

        req.user = user;
        next();
    } catch (error) {
        next(createHttpError(401, "Invalid token!"));
    }
}

module.exports = { isVerifedUser };
