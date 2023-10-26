const express = require('express')
const app = express()
const mongoose = require('./db/config');
const companyRoutes = require('./Routes/companyRoutes');

app.use(express.json());

app.use('/api/companies', companyRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});