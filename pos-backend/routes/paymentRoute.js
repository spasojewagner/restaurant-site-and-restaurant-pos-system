const express =require("express");
 const { isVerifedUser } = require("../middlewares/tokenverification");
const { createOrder, verifyPayment, webHookVerification, getPayments, createCashPayment } = require("../controllers/paymentController");
const router=express.Router();

router.route("/create-order").post(isVerifedUser, createOrder);
router.route("/verify-payment").post(isVerifedUser, verifyPayment);
router.route("/webhook-verification").post(webHookVerification);
router.route("/").get(isVerifedUser, getPayments);
router.route("/cash-payment").post(isVerifedUser, createCashPayment);

module.exports=router;
