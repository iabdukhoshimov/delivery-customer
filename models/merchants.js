const mongoose = require("mongoose")
const { v4 } = require("uuid")

const Merchant = new mongoose.Schema({
    _id: {
        type: String,
        default: v4
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    director: {
        type: String,

    },
    director_phone: {
        type: String,
    },
    sales_manager: {
        type: String,
    },
    sales_manager_phone: {
        type: String,
    },
    geo_x: {
        type: String,
    },
    geo_y: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    region: {
        type: String,
    },

}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

module.exports = {
    MerchantModel: mongoose.model('Merchant', Merchant)
}