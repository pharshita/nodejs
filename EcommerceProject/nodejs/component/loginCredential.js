const signup_signin = require('../models/loginmodel')
const bcrypt = require('bcrypt');
// const nodemailer = require('nodemailer');
// const crypto = require('crypto');

// function generateResetToken() {
//     return crypto.randomBytes(20).toString('hex');
// }


// const transporter = nodemailer.createTransport({
//     // Configure your email service here (SMTP or other email service)
//     service: 'gmail',
//     auth: {
//         user: 'your_email@gmail.com',
//         pass: 'your_email_password',
//     },
// });

module.exports = {
    UserList: async (req, res) => {
        try {
            const user = await signup_signin.find().exec();
            res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching companies:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    signupUser: async (req, res) => {
        const { username, email, password } = req.body;
        if (!username && !email && !password) {
            return res.status(404).json({ "username": "this field is required", "email": "this field is required", "password": "this field is required" });
        }
        else if (!username) {
            return res.status(404).json({ "usename": "this field is required" });
        }
        else if (!email) {
            return res.status(404).json({ "email": "this field is required" });
        }
        else if (!password) {
            return res.status(404).json({ "password": "this field is required" });
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new signup_signin({ username, email, password: hashedPassword });
            user.save()
            res.status(201).json({ id: user._id, user: user.username, email: user.email });
        } catch (error) {
            console.error(error);
            res.status(400).json('Error during registration');
        }
    },
    loginUser: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await signup_signin.findOne({ email });
            if (!user) {
                return res.status(404).json("User not found");
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json("Invalid password");
            }
            res.status(201).json({ id: user._id, user: user.username, email: user.email });
        } catch (error) {
            res.status(500).json("internal server error");
        }
    },
    forgotPassword:async(req,res)=>{
        res.send("i am sending mail")
    }
}