const express = require("express");
const {addReview, getReviews, deleteReviews}= require("../controllers/reviewsController");
const router = express.Router();

router.route("/").post(addReview);
router.route("/").get(getReviews);
router.route("/:id").delete(deleteReviews);

module.exports=router;