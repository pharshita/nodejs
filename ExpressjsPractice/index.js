const express = require('express');
const apiRoutes = require('./component/api');
const formdata = require('./component/form');
// const finallist = require('./component/mongoos')
const app = express();

app.use(apiRoutes , formdata );

app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });