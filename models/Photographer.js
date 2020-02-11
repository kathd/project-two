const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photographerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number
    },
    location: {
        type: String,
    },
    email: {
        type: String,
    },
    profile_picture: {
        type: String,
    },
    reviews: {
        type : [String]
    } ,
    portfolio: [String],
    categories: {
        type: [String],
        enum: ["events", "lifestyle", "real estate", "portrait", "packshots", "food", "fashion", "advertising"]
    }
});

const Photographer = mongoose.model("Photographer", photographerSchema);

module.exports = Photographer;