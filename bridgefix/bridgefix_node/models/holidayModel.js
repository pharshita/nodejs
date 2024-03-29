const mongoose =  require('mongoose')
const holidaySchema =  new mongoose.Schema({
    holiday_name : String,
    holiday_date : String
},{versionKey:false})

module.exports =  new mongoose.model('holiday',holidaySchema)