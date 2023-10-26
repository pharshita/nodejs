
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
}, { versionKey: false });

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
    try {
        const result = await newCompany.save();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.delete('/api/companydata/:customId', (req, res) => {
    const { customId } = req.params;

    Company.findOneAndDelete({ customId: customId })
        .then((deletedData) => {
            if (!deletedData) {
                res.status(404).json({ error: 'Data not found' });
            } else {
                res.status(200).json({ message: 'Data deleted successfully' });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

app.put('/api/companydata/:customId', (req, res) => {
    const { customId } = req.params;
    const { name } = req.body;
    Company.findOneAndUpdate({ customId: customId }, { name }, { new: true })
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