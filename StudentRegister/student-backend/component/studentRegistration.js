const Student_Registration = require('../models/studentModel')

module.exports = {
    getStudent: async (req, res) => {
        try {
            const data = await Student_Registration.find()
            if (data.length > 0) {
                console.log(data)
                res.status(200).json(data);
            }
            else {
                res.status(200).json([])
            }
        } catch {
            res.status(500).json('internal server error');
        }
    },
    postStudent: async (req, res) => {
        const newStudent = new Student_Registration({
            name: req.body.name,
            number: req.body.number,
            email: req.body.email,
            gender: req.body.gender,
            DOB: req.body.DOB,
            address: req.body.address,
            city: req.body.city
        });
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    }
}