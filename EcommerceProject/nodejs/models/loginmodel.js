const mongoose = require('mongoose')

const loginlogoutSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
},{versionKey:false})
module.exports = new mongoose.model("signup_signin", loginlogoutSchema)