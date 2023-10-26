
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
    customId: Number, 
    name: String,
    email: String,
    age: Number,
    phone: Number,
    gender:String,
    checkbox:Array,
})
const list = new mongoose.model("list", NewSchema)
let arr = []

app.use(bodyParser.json())
app.use(cors());

let nextId = 1;

function generateNextId() {
    return nextId++;
}

//......................................getdata....................................................
// app.get('/api/data', (req, res) => {
//     list.find()
//     // list.find({ $and: [ { name: "Harshita" }, { age: 12 } ] })
//     // list.find({name:{$nin : ["dfdfg","gfgdfg"]}})
//     // list.find( { $nor: [ { name: "patidar" }, { age: 13 } ]  } )

//         .then((data) => {
//             res.json(data);
//         })
//     // app.get("/api/data", function (req, res) {
//     //     list.find()
//     //     res.send(arr)
// })

app.get('/api/data', async (req, res) => {
    try {
        // const result = await list.find({},{"name":1,_id:0}).sort({name:-1}).limit(3).skip(2)
        const result = await list.find().sort({ _id: -1 })
        res.json(result);
    } catch (err) {
        console.log(err)
    }
})
//......................................getdata api in 2 types done....................................................
//......................................postdata....................................................
app.post("/api/data", async (req, res) => {
    const { name, email, age, phone ,gender,checkbox} = req.body;
    const customId = generateNextId();
    const post = new list({customId, name, email, age, phone ,gender,checkbox});
    // post._id = customId;
    post.save()
    res.send("form submited")
})
//......................................postdata done....................................................
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
            return res.status(404).json({ success: false, message: 'Item not found.' });
        }
        res.json({ success: true, message: 'Item deleted successfully.' });
    })
        .catch((error) => {
            res.status(500).json({ error: 'Error deleting data' });
        });
});

//..............................................updatedata...................................

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
    //.....................................................................................................
    const { id } = req.params;
    const { name, email, age, phone ,gender ,checkbox} = req.body;
    list.findByIdAndUpdate(id, { name, email, age, phone,gender,checkbox }, { new: true })
        .then((updatedData) => {
            if (!updatedData) {
                return res.status(404).json({ error: 'Data not found' });
            }
            res.json(updatedData);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error updating data' });
        });

    //......................................................................................................

});

const update = async (_id) => {
    // try {
    //     const result = await list.updateOne({_id}, {
    //         $set: {
    //             name: "helloWorld"
    //         }
    //     });
    //     console.log(result)
    // }
    try {
        const result = await list.updateMany({ _id }, {
            $set: {
                name: "hello",
                phone: 11111111
            }
        });
        console.log(result)
    }
    catch (err) {
        console.log(err)

    }
}
// update("6486b3905194ef0290075e47")
//.............................................update done.................................


module.exports = app;