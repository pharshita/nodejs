const express = require('express')
const app = express()
const mongoose = require('./db/config');
const productRoute = require('./routes/produnctRoute')
const userRoute = require('./routes/signin_signup_route')
const CategoryRoute= require('./routes/CategoryRoute')
const CartRoute=require('./routes/CartRoute')
const cors = require('cors');
app.use(cors());


app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use('/user',userRoute)
app.use('/add-product',productRoute)    
app.use('/product-category',CategoryRoute)    
app.use('/cart',CartRoute)    

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});