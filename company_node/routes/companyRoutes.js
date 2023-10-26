const express = require('express')
const router = express.Router()
const companyList = require('../component/companyname')

router.get('/',companyList.getcompanyList)
router.post('/',companyList.postcompanyList)
router.delete('/:id',companyList.deletecompanyList)
router.put('/:id',companyList.updatecompanyList)

module.exports = router