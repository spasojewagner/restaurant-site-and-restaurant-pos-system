const express =require("express");
const { register, login , getUserData, logout} = require("../controllers/userContoller");
const {isVerifedUser} =require("../middlewares/tokenverification");
const router=express.Router();

//auth route
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(isVerifedUser, getUserData);
router.route("/logout").post(isVerifedUser,logout)
console.log("User routes loaded!");


module.exports=router;