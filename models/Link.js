const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linkSchema = new Schema({
    dateLinked: {
        type: Date,
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

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;