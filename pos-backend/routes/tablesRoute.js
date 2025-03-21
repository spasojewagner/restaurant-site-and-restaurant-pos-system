const express =require("express");
const { addTable, getTables, updateTable } = require("../controllers/tableContoller");
 const { isVerifedUser } = require("../middlewares/tokenverification");
const router=express.Router();

router.route("/").post(isVerifedUser,addTable);
router.route("/").get(isVerifedUser, getTables);
router.route("/:id").put(isVerifedUser, updateTable);

module.exports=router;
//isVerifedUser ,