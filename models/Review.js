const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {
        type: String
    }
    // dateLinked from LINK MODEL
    // firstname from USER MODEL
    // photographer_id

});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;