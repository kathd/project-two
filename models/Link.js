const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linkSchema = new Schema({
    // dateLinked
    // user_id
    // photographer_id

});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;