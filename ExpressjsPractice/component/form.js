const express = require("express")
const app = express()
const cors = require('cors');
var bodyParser = require('body-parser')

let newarr = ""
app.use(bodyParser.json())
app.use(cors());

app.get('/formdata',function(req,res){
    console.log("get formdata")
    res.send(newarr)
})

app.post('/formdata',function(req,res){
    console.log(req.body)
    let v1 = Number(req.body.value1)
    let v2 = Number(req.body.value2)
    let sum = v1 + v2
    newarr = `${sum}`
    res.send("Data submited")
})

module.exports = app