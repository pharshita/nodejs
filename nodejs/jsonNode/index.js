const fs = require("fs")
const data = {
    name : "harshita",
    age : 24,
}
const jsondata = JSON.stringify(data)

// fs.writeFile('json1.json',jsondata,(err)=>{
// // console.log("done")
// })
fs.readFile("json1.json","utf-8",(err,data)=>{
    // console.log(data)
   console.log(JSON.parse(data))
})