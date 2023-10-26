const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
    customId:Number,
    name:String,
    description:String,
    date:String,
    location:String,
})
module.exports = mongoose.model("companyName",companySchema)