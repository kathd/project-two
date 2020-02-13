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
        enum: ["Paris", "London", "Madrid", "Berlin"]
    },
    email: {
        type: String,
    },
    profile_picture: {
        type: String,
        default: "/images/emtpy-profile.png"
    },
    reviews: {
        type : [{ type : Schema.Types.ObjectId, ref: 'Review' }]
    } ,
    portfolio: [String],
    categories: {
        type: [String],
        enum: ["events", "lifestyle", "real estate", "portrait", "packshots", "food", "fashion", "advertising"]
    },
    fans :[ { type : Schema.Types.ObjectId, ref: 'User' } ],
});

const Photographer = mongoose.model("Photographer", photographerSchema);

module.exports = Photographer;