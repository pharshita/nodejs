const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
    customId: Number,
    name: String,
},{ versionKey: false });

module.exports = mongoose.model("Company", companySchema);