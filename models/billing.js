const mongoose = require("mongoose")
const { v4 } = require("uuid")

const Billing = new mongoose.Schema({
    _id: {
        type: String,
        default: v4
    },
    user_id: {
        type: String,
        required: [true, 'user_id is required']
    },
    driver_id: {
        type: String,
        required: [true, 'driver_id is required']
    },
    cost: {
        type: Number,
        required: [true, 'cost is required']
    },
    status: {
        type: String,
        enum: ['New', 'In Progres', 'Finished', 'Canceled'],
        default: 'New'
    },
    delivery_cost: {
        type: Number,
        default: 0
    },
    comment: {
        type: String,
    },
    spend_time: {
        type: String,
    },
    canceled_at: {
        type: Date,
    },

}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
        created_date: "created_date",
        accepted_at: "accepted_at",
        delivered_at: "delivered_at",
    }

})

module.exports = {
    BillingModel: mongoose.model('Billing', Billing)
}