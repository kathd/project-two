const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {
        type: String
    },
    link: {
        type: Schema.Types.ObjectId,
        ref: "Link"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    photographer: {
        type: Schema.Types.ObjectId,
        ref: "Photographer"
    }

});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;