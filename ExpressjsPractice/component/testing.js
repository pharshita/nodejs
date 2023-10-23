
const express = require("express")
const app = express()
const cors = require('cors');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/basicdata", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Connected!') })
    .catch((err) => { console.log(err) })

const db = mongoose.connection;

const counterSchema = new mongoose.Schema({
    _id: String,
    seq: Number
});

const Counter = mongoose.model('Counter', counterSchema);

const companySchema = new mongoose.Schema({
    customId: Number,
    name: String
}, { versionKey: false });

const Company = mongoose.model('Company', companySchema);


app.use(bodyParser.json())
app.use(cors());

app.get('/api/companydata', async (req, res) => {
    try {
        const result = await Company.find({}, { _id: 0 }).exec();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})
app.post('/api/companydata', async (req, res) => {
    const { name } = req.body;
    const counterDoc = await Counter.findOneAndUpdate(
        { _id: 'companyListId' },
        { $inc: { seq: 1 } },
        { upsert: true, new: true }
    );

    const customId = counterDoc.seq;

    const newCompany = new Company({
        customId: customId,
        name: name
    });
    console.log(newCompany)
    try {
        const result = await newCompany.save();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = app;