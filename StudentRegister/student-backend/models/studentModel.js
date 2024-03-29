const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: String,
    number:String,
    email: String,
    gender:String,
    DOB:String,
    address:String,
    city:String,

},{versionKey:false})
module.exports = new mongoose.model("Student_Registration", studentSchema)