const mongoose = require("mongoose")
const { v4 } = require("uuid")

const Category = new mongoose.Schema({
    _id: {
        type: String,
        default: v4
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    description: {
        type: String,
    },

}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

module.exports = {
    CategoryModel: mongoose.model('Category', Category)
}