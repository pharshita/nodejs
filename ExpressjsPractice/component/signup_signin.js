const express = require("express")
const app = express()
const cors = require('cors');
const bcrypt = require('bcrypt');

var bodyParser = require('body-parser')
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/signApi", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Connected!') })
    .catch((err) => { console.log(err) })

const db = mongoose.connection;
const loginSchema = new mongoose.Schema({
    username:String,
    email: String,
    password: String,
    confirmPassword: String,
})
const login_logout = new mongoose.model("login_logout", loginSchema)

app.use(bodyParser.json())
app.use(cors());


app.post("/signup", async (req, res) => {
    try {
        const {username, email, password ,confirmPassword} = req.body;
    
        // Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);
        // const chashedPassword = await bcrypt.hash(confirmPassword, 10);
      const hashedPassword = await bcrypt.hash(password, 10);
        const chashedPassword = await bcrypt.hash(confirmPassword, 10);
        // Create a new user
        const user = new login_logout({username, email, password:hashedPassword ,confirmPassword:chashedPassword});
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
module.exports = app;