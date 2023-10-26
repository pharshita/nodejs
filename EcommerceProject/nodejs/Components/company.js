const Company = require('../models/companyModel');
const Counter = require('../models/counterModel');

// Define controller methods for companies
module.exports = {
  getAllCompanies: async (req, res) => {
    try {
      const companies = await Company.find({}, { _id: 0 }).exec();
      res.status(200).json(companies);
    } catch (error) {
      console.error('Error fetching companies:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createCompany: async (req, res) => {
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
  },
};