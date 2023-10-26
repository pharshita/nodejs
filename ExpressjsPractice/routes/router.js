const express = require('express');
const router = express.Router()
const apiRoutes = require('../component/api');
const formdata = require('../component/form');
const signup_signin = require('../component/signup_signin');

router.use(apiRoutes , formdata ,signup_signin );

module.exports = router;