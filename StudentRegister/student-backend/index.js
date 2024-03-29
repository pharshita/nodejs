const express = require('express')
const app = express()
const mongoose = require('./db/config');
const studentRoute = require('./routes/studentRoutes')

app.use(express.json());
app.use('/student',studentRoute)

app.listen(5000,()=>{
    console.log('server is running on port 5000 ')
})