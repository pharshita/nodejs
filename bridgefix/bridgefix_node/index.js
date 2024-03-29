const express = require('express')
const app = express()
const mongoose = require('./db/config')
const userRoute = require('./routes/loginRoute')
const holidayRoute = require('./routes/holidayRoute')

app.use(express.json());
app.use('/user',userRoute)
app.use('/holiday',holidayRoute)
app.listen(7000,()=>{
    console.log('Server is running on port 7000');
})