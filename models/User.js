const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    company: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    avatar: {
        type: String,
        default: "/images/emtpy-profile.png"
    },
    photogfav: [ { type : Schema.Types.ObjectId, ref: 'Photographer' } ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;