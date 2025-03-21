const express = require("express");
const { addOrder, getOrders, getOrderById, updateOrder, deleteOrder } = require("../controllers/OrderController");
const { isVerifedUser } = require("../middlewares/tokenverification");
const router = express.Router();

router.route("/").post(isVerifedUser, addOrder);
router.route("/").get(isVerifedUser, getOrders);
router.route("/:id").get(isVerifedUser, getOrderById);
router.route("/:id").put(isVerifedUser, updateOrder);
router.route("/:id").delete(isVerifedUser, deleteOrder);

module.exports=router;
