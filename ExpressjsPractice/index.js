const express = require('express');
const apiRoutes = require('./component/api');
const formdata = require('./component/form');
const signup_signin = require('./component/signup_signin')
const testing = require('./component/testing')
// const finallist = require('./component/mongoos')
const app = express();

app.use(apiRoutes , formdata ,signup_signin ,testing,testing);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });