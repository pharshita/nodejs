
const express = require("express")
const app = express()
const cors = require('cors');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/basicdata", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Connected!') })
    .catch((err) => { console.log(err) })

const db = mongoose.connection;
const NewSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    phone: Number,
})
const list = new mongoose.model("list", NewSchema)
let arr = []

app.use(bodyParser.json())
app.use(cors());


app.get('/api/data', (req, res) => {
    list.find()
        .then((data) => {
            res.json(data);
        })
    // app.get("/api/data", function (req, res) {
    //     list.find()
    //     res.send(arr)
})

app.post("/api/data", async (req, res) => {
    const { name, email, phone } = req.body;
    // arr.push(req.body)
    const post = new list({ name, email, phone });
    post.save()
    res.send("form submited")
})

app.delete('/api/data/:id', (req, res) => {
    // const id = parseInt(req.params.id);

    // const index = arr.findIndex(item => item.id === id);
    // if (index !== -1) {
    //     arr.splice(index, 1);
    //     res.json({ success: true, message: 'Item deleted successfully.' });
    // } else {
    //     res.status(404).json({ success: false, message: 'Item not found.' });
    // }
    const { id } = req.params;
    list.findByIdAndDelete(id).then((deletedData) => {
            if (!deletedData) {
                return  res.status(404).json({ success: false, message: 'Item not found.' });
            }
            res.json({ success: true, message: 'Item deleted successfully.' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error deleting data' });
        });
});
// app.patch('/api/data/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const newData = req.body;
//     const updatedArray = arr.map((item, index) => {
//             if ( item.id === id) {
//                   return { ...item, ...newData };
//                 }
//                 return item;
//         });
//    arr = updatedArray
//     res.send("update succesfully");
// });

app.put('/api/data/:id', (req, res) => {
    // const id = parseInt(req.params.id);
    // const { name, email, phone } = req.body;
    // const newData = req.body;

    // list.findByIdAndUpdate(id, { name, email, phone }, { new: true })
    // const updatedArray = arr.map((item, index) => {
    //     if (item.id === id) {
    //         return { ...item, ...newData };
    //     }
    //     return item;
    // });
    // arr = updatedArray
    // console.log(updatedArray)
    // res.send("update succesfully");

    const { id } = req.params;
    const { name, email, phone } = req.body;
    list.findByIdAndUpdate(id, {  name, email, phone }, { new: true })
    .then((updatedData) => {
      if (!updatedData) {
        return res.status(404).json({ error: 'Data not found' });
      }
      res.json(updatedData);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error updating data' });
    });
});


module.exports = app;