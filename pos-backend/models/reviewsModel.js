const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
    reviewsrDetails: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        review : { type: String, required: true },
    },
});
module.exports = mongoose.model("Reviews", reviewsSchema);
