const express = require('express')
const app = express()
const mongoose = require('./db/config')
const companyRoute = require('./routes/companyRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
app.use(express.json());

app.use("/company", companyRoute)
app.use("/employee", employeeRoutes)

app.listen(6000, () => {
    console.log("server running on port 6000")
})