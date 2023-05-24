const express = require("express")
const app = express()

app.get("/", function (req, res) {
    res.write("<h1>welcome to home page</h1>")
    res.write("<h1>hello</h1>")
    res.send()
})

app.get("/about", function (req, res) {
    res.status(200).send("welcome to about page")
})
app.get("/contact", function (req, res) {
    res.status(200).send("welcome to contact page")
})
app.get("/temp", function (req, res) {
  res.send([
    {
    id:1,
    name:"harshita"
  }, 
  {
    id:2,
    name:"patidar"
  },
])
})

app.listen(5000, "127.0.0.1")