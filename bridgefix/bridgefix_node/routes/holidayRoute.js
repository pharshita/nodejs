const express = require('express')
const router = express.Router()
const holiday = require('../component/Holiday')
const verifyToken = require('../Middleware/verifyToken')

router.get("/",verifyToken,holiday.getHoliday)

module.exports = router