const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    // user_id
    // photographer_id
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;