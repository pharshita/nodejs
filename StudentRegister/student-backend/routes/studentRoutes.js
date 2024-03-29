const express = require('express')
const router = express.Router()
const studentData = require('../component/studentRegistration')

router.get('/', studentData.getStudent);
router.post('/', studentData.postStudent);

module.exports = router