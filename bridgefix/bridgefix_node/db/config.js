const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/dashboard',{useNewURLParser:true,useUnifiedTopology:true,})
.then(()=>console.log("db connected"))
.catch(()=>console.log("error"))                                                  