const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    customerDetails: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        guests: { type: Number, required: true },
        request: {type: String, required: false},
    },
    reservationDate: {
        type: Date,
        default: Date.now
    },

},);
module.exports = mongoose.model("Reservation", reservationSchema);