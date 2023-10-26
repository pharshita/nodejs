const mongoose = require('mongoose')
const employeeSchema = new mongoose.Schema({
    id:Number,
    companyID:Number,
    first_name:String,
    last_name:String,
    email:String,
    phone:Number,
    date:String,
})
module.exports = mongoose.model("employeeList",employeeSchema)