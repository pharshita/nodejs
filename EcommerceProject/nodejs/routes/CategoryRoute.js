const express = require('express')
const router = express.Router()
const productList = require('../component/category')

router.get('/', productList.getProductCategory)
router.get('/:productCategory', productList.getProduct)
router.get('/categoryId/:id', productList.getCategory_ID)

module.exports = router
