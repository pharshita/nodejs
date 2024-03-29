const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/student-data', { useNewUrlParser: true, useUnifiedTopology: true,})
.then(()=>console.log("db connected"))
.catch(()=>console.log("error"))

module.exports = mongoose


