const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    email:String,
    password:String
},{versionKey:false})

module.exports = new mongoose.model('user',loginSchema)