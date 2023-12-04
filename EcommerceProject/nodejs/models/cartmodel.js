const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    fileDetails: {
        fieldName: String,
        originalName: String,
        encoding: String,
        mimetype: String,
        destination: String,
        filename: String,
        path: String,
        size: Number,
    },
    id: String,
    name: String,
    price: String,
    category: String,
    userId: String,
    Number: Number,
    company: String,
}, { versionKey: false })

module.exports = mongoose.model("cart", cartSchema)