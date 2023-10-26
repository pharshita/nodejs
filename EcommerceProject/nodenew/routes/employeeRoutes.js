const express = require('express')
const router = express.Router()
const employeeList = require('../component/employeeList')

router.get('/',employeeList.getEmployee)
router.get('/:companyID',employeeList.getIDEmployee)
router.post('/',employeeList.postEmployee)
router.delete('/:id',employeeList.deleteEmployee)
router.put('/:id', employeeList.updateEmployee);

module.exports = router
