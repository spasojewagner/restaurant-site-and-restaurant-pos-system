const createHttpError = require("http-errors");
const Reviews = require("../models/reviewsModel");
const { default: mongoose } = require("mongoose");


const addReview = async (req, res, next) => {
    try {

        const review = new Reviews(req.body);
        await review.save();
        res
            .status(201)
            .json({ success: true, message: "Review!", data: review });
    } catch (error) {
        next(error);
    }
};


const getReviews = async (req, res, next) => {
    try {
        const reviews = await Reviews.find()
        res.status(200).json({ data: reviews });
    } catch (error) {
        next(error);
    }
};



// //brisanje ordera 
const deleteReviews = async (req, res, next) => {
    try {
        const { id } = req.params;

        const review = await Reviews.findByIdAndDelete(id);
        if (!review) throw createHttpError(404, 'Recenzija ne postoji');

    
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = { addReview,deleteReviews,getReviews };
