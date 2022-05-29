const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    purpose: {
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    reserve: {
        type: Boolean,
        default: false
    },
    disable: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    userName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    features: {
        bedrooms: {
            type: String,
            default: null
        },
        drawingroom: {
            type: String,
            default: null
        },
        bathrooms: {
            type: String,
            default: null
        },
        diningroom: {
            type: String,
            default: null
        },
        servantquarters: {
            type: String,
            default: null
        },
        studyroom: {
            type: String,
            default: null
        },
        electricitybackup: {
            type: String,
            default: null
        },
        prayer_room: {
            type: String,
            default: null
        },
        flooring: {
            type: String,
            default: null
        },
        gym: {
            type: String,
            default: null
        },
        nearbyschoole: {
            type: String,
            default: null
        },
        nearbyhospital: {
            type: String,
            default: null
        },
        nearbyshoppingmalls: {
            type: String,
            default: null
        },
        nearbyrestaurants: {
            type: String,
            default: null
        },
        distanceairport: {
            type: String,
            default: null
        },
        sewerage: {
            type: String,
            default: null
        },
        watersupply: {
            type: String,
            default: null
        },
        suigas: {
            type: String,
            default: null
        },
        disable: {
            type: Boolean,
            default: false
        },
    },
});
module.exports.Property = new mongoose.model("property", propertySchema);