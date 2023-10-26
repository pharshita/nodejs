const express = require("express")
const app = express()
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
var bodyParser = require('body-parser')
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/signApi", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Connected!') })
    .catch((err) => { console.log(err) })

const db = mongoose.connection;
const loginSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
})
const login_logout = new mongoose.model("login_logout", loginSchema)


const transporter = nodemailer.createTransport({
    auth: {
        user: 'harshitahppatidar@gmail.com',
        pass: 'oudn mgpn abnd hgol',
    },
    secure: true, 
  });

const otpSchema = new mongoose.Schema({
    email: String,
    code: Number,
    expireIn: Date,
  });
  const Otp = mongoose.model("Otp", otpSchema);

app.use(bodyParser.json())
app.use(cors());

app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const user = new login_logout({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send('Error during registration');
    }
})

app.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await login_logout.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send("Invalid password");
        }

        res.status(200).send("Signin successful");
    } catch (error) {
        console.error("Error during signin:", error);
        res.status(400).send("Error during signin");
    }
});
// app.post("/forgot-password", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await login_logout.findOne({ email });
//         if (email !== "" && password == "") {
//             if (!user) {
//                 return res.status(404).send("User not found");
//             }
//             // const otp =  Math.floor(100000 + Math.random() * 900000).toString();
//             // const otpExpiry = new Date(Date.now() + 600000); // OTP expires in 10 minutes


//             res.status(200).send("ok");
//         }
//         else if (email !== "" && password !== "") {
//             const hashedPassword = await bcrypt.hash(password, 10);
//             user.password = hashedPassword
//             await user.save();
//             res.status(200).send("Password updated successfully");
//         }

//     } catch (error) {
//         console.error("Error:", error);
//     }

// })

app.post("/forgot-password", async (req, res) => {
    try {
        const { email, otp } = req.body;
        // Check if OTP is valid and not expired
        const otpData = await Otp.findOne({ email, code: otp, expireIn: { $gt: new Date() } });
        if (!otpData) {
            return res.status(401).send("Invalid or expired OTP");
        }
        // OTP is valid, allow the user to reset the password
        res.status(200).send("OTP verified successfully");
    } catch (error) {
        console.error("Error during OTP verification:", error);
        res.status(500).send("Internal Server Error");
    }
    // try {
    //     const { email, password } = req.body;
    //     const user = await login_logout.findOne({ email });
    //     if (email !== "" && password == "") {
    //         if (!user) {
    //             return res.status(404).send("User not found");
    //         }
    //         // const otp =  Math.floor(100000 + Math.random() * 900000).toString();
    //         // const otpExpiry = new Date(Date.now() + 600000); // OTP expires in 10 minutes


    //         res.status(200).send("ok");
    //     }
    //     else if (email !== "" && password !== "") {
    //         const hashedPassword = await bcrypt.hash(password, 10);
    //         user.password = hashedPassword
    //         await user.save();
    //         res.status(200).send("Password updated successfully");
    //     }

    // } catch (error) {
    //     console.error("Error:", error);
    // }

})

module.exports = app;
