
const express = require("express")
const app = express()
const cors = require('cors');
var bodyParser = require('body-parser')
let arr = []

app.use(bodyParser.json())
app.use(cors());

app.get("/api/data", function (req, res) {
    res.send(arr)
})

app.post("/api/data", (req, res) => {
    arr.push(req.body)
    res.send("form submited")
})

app.delete('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = arr.findIndex(item => item.id === id);
    if (index !== -1) {
        arr.splice(index, 1);
        res.json({ success: true, message: 'Item deleted successfully.' });
    } else {
        res.status(404).json({ success: false, message: 'Item not found.' });
    }
});
app.patch('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const newData = req.body;
    const updatedArray = arr.map((item, index) => {
            if ( item.id === id) {
                  return { ...item, ...newData };
                }
                return item;
        });
   arr = updatedArray
    res.send("update succesfully");
});


module.exports = app ;