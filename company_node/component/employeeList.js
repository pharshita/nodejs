const employee = require('../models/employeemodel')
const Counter = require('../models/counterModel');

module.exports = {
    getEmployee: async (req, res) => {
        const { companyID } = req.params
        try {
            const results = await employee.find()
            console.log(results)
            res.json(results)
        } catch {
            console.log("error")
        }
    },
    getIDEmployee: async (req, res) => {
        const { companyID } = req.params
        try {
            const results = await employee.find({ companyID })
            console.log(results)
            res.json(results)
        } catch {
            console.log("error")
        }
    },
    postEmployee: async (req, res) => {
        const { companyID, first_name, last_name, email, phone, date } = req.body
        const counterDoc = await Counter.findOneAndUpdate(
            { _id: 'companyListId' },
            { $inc: { seq: 1 } },
            { upsert: true, new: true }
        );
        const customId = counterDoc.seq;
        const post = new employee({ id: customId, companyID, first_name, last_name, email, phone, date })
        post.save()
        res.send("form submitted")
    },
    deleteEmployee: async (req, res) => {
        const { id } = req.params
        employee.findOneAndDelete({ id: id })
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

            })
    },
    updateEmployee: async (req, res) => {
        const { id, companyID } = req.params
        const { first_name, last_name, email, phone, date } = req.body
        employee.findOneAndUpdate({ id: id }, { first_name, last_name, email, phone, date }, { new: true })
            .then((updatedata) => {
                if (!updatedata) {
                    res.status(404).json({ error: 'Data not found' })
                }
                res.status(201).json({ message: 'Data updated successfully' })
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });

            })
    }
}