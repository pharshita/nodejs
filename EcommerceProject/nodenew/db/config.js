const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true,})
.then(()=>console.log("databse connected"))
.catch(()=>console.log("database error"))

module.exports = mongoose