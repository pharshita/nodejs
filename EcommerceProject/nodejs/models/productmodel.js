const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
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
    name: String,
    price: String,
    category: String,
    userId: String,
    company: String,
}, { versionKey: false })

module.exports = mongoose.model("product", productSchema)