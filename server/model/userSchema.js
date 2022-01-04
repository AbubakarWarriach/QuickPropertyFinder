const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    area: {
        type: String,
        default: null
    },
    longitude: {
        type: Number,
        default: null
    },
    latitude: {
        type: Number,
        default: null
    },
    admin: {
        type: Boolean,
        default: false
    },
    verify: {
        type: Boolean,
        default: false
    },
    // date: {
    //     type: Date,
    //     default: Date.now
    // }
});
module.exports.User = new mongoose.model("property_dealer", userSchema);