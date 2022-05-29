const mongoose = require('mongoose');

const reserveSchema = new mongoose.Schema({
    propertyTitle: {
        type: String,
        required: true
    },
    propertyId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    dealerId: {
        type: Number,
        required: true
    },
    dealerName: {
        type: String,
        required: true
    },
});
module.exports.Reserved = new mongoose.model("reserve_property", reserveSchema);