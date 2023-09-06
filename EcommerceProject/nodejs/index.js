const express = require('express')
const mongoose = require('mongoose');
const app = express()


mongoose.connect("mongodb://localhost:27017/e-comm", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected!')
        const NewSchema = new mongoose.Schema({
            id: Number,
        })
        const product = mongoose.model('product',NewSchema)
        const data = await product.find();
        console.log(data)
    })
    .catch((err) => { console.log(err) })

// const list = new mongoose.model("e-comm", NewSchema)
app.get('/', function (req, res) {
    res.send('app is working')
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});