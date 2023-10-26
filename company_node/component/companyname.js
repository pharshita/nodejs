const company = require('../models/companymodel')
const Counter = require('../models/counterModel');

module.exports = {
    getcompanyList: async (req, res) => {
        try {
            const test = await company.find().exec();
            res.status(200).json(test);
        } catch (error) {
            console.error('Error fetching companies:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    postcompanyList: async (req, res) => {
        const { name, description, date, location } = req.body

        const counterDoc = await Counter.findOneAndUpdate(
            { _id: 'companyListId' },
            { $inc: { seq: 1 } },
            { upsert: true, new: true }
        );

        const customId = counterDoc.seq;

        const post = new company({   customId: customId, name, description, date, location })
        post.save()
        res.send("form submitted")
    },
    deletecompanyList: async (req, res) => {
        const { id } = req.params;
        company.findByIdAndDelete(id).then((deletedata) => {
            if (!deletedata) {
                res.status(404).json("data not found")
            }
            res.status(200).json({ success: true, message: 'Item deleted successfully.' })
        }).catch(() => {
            res.status(500).json("internal server error")
        })
    },
    updatecompanyList: async (req, res) => {
        const { id } = req.params
        const { name, description, date, location } = req.body
        company.findByIdAndUpdate(id, { name, description, date, location }, { new: true }).then((updatedata) => {
            if (!updatedata) {
                res.status(404).json("data not found")
            }
            res.json(updatedata);
        })
            .catch((error) => {
                res.status(500).json({ error: 'Error updating data' });
            });
    }
}