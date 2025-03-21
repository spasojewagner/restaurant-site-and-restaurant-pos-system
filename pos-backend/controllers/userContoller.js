const createHttpError = require("http-errors");
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require("../config/config");

const register = async (req, res, next) => {
    try {
        const { name, phone, email, password, role } = req.body;
        if (!name || !phone || !email || !password || !role) {
            return next(createHttpError(400, "All fields are required"));
        }
        const isUserPresent = await User.findOne({ email });
        if (isUserPresent) {
            return next(createHttpError(400, "User already exists"));
        }
        const newUser = new User({ name, phone, email, password, role });
        await newUser.save();
        res.status(201).json({ success: true, message: "New user created!", data: newUser });
    } catch (error) {
        next(error);
    }
};
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            const error = createHttpError(400, "ALL fields required!");
            return next(error);
        }
        // const userLogin= await User.findOne({email})
        const isUserPresent = await User.findOne({ email });
        if (!isUserPresent) {
            const error = createHttpError(401, "Invalid Credentials");
            return next(error);
        }
        const isMatch = await bcrypt.compare(password, isUserPresent.password);
        if (!isMatch) {
            const error = createHttpError(401, "Invalid Credentials");
            return next(error);
        }
        const accesToken = jwt.sign({ _id: isUserPresent._id }, config.accesTokenSecret, {
            expiresIn: '1d'
        });


        res.cookie('accesToken', accesToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            sameTime: 'none',
            secure: true
        })
        res.status(200).json({
            success: true, message: "User login success",
            data: isUserPresent
        })

    } catch (error) {
        next(error);
    }
}

const getUserData = async (req, res, next) => {
    try{

        const user= await User.findById(req.user._id);
        res.status(200).json({success: true, data: user});

    }catch(error){
        next(error);
    }
}

const logout= async (req, res, next)=>{
    try {
        res.clearCookie('accesToken') ;
        res.status(200).json({success: true, message: ' User Logout successfully!'})  
    } catch (error) {
        next(error);
    }
}
module.exports = { register, login, getUserData , logout}