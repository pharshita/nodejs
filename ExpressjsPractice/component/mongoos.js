// const mongoose = require('mongoose');


// mongoose.connect("mongodb://localhost:27017/basicdata",{useNewUrlParser:true,useUnifiedTopology:true})
// .then(()=>{ console.log('Connected!')})
// .catch((err)=>{console.log(err)})

// const NewSchema = new mongoose.Schema({
//     Fname: {
//         type:String,
//         required:true
//     },
//     Lname:String,
//     age:Number,
//     gender:String
// })

// const list = new mongoose.model("list",NewSchema)
// const finallist = async ()=>{
//     const reactPlayList = new list({
//         Fname: "Harshippppp",
//         Lname:"patidarrrrrrrr",
//         age:20,
//         gender:"female"
//     })

//     const namePlayList = new list({
//         Fname: "sddasd",
//         Lname:"asdasd",
//         age:12,
//         gender:"dfsfsdf"
//     })
//     const fnamePlayList = new list({
//         Fname: "sdfsdfsdf",
//         Lname:"asdadfsdfsd",
//         age:124,
//         gender:"dfssdfsdffsdf"
//     })
    
//     const result = await list.insertMany([reactPlayList,namePlayList,fnamePlayList])

// }
// finallist()
// module.exports = finallist
