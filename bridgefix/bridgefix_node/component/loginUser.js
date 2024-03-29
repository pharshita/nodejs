const login = require('../models/loginModels')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '59a082d57c643853959807b8ad2517160caa9f162efd9b2bf7585b811a2fb14e';

module.exports = {
    UserList: async (req, res) => {
        try {
            const user = await login.find().exec();
            res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching companies:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    signupUser: async (req, res) => {
        const { email, password } = req.body;
        console.log(email,password)
        if ( !email && !password) {
            return res.status(404).json({  "email": "this field is required", "password": "this field is required" });
        }
        else if (!email) {
            return res.status(404).json({ "email": "this field is required" });
        }
        else if (!password) {
            return res.status(404).json({ "password": "this field is required" });
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new login({  email, password: hashedPassword });
            user.save()
            res.status(201).json({ id: user._id,  email: user.email });
        } catch (error) {
            console.error(error);
            res.status(400).json('Error during registration');
        }
    },
    loginUser: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await login.findOne({ email });
            if (!user) {
                return res.status(404).json("User not found");
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json("Invalid password");
            }
            const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
            res.status(201).json({token , id: user._id, email: user.email });
        } catch (error) {
            res.status(500).json("internal server error");
        }
    },
}