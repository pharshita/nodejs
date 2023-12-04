const express = require('express')
const router = express.Router()
const productList = require('../component/product')

router.get('/', productList.getProductList)
router.post('/', productList.postProduct)
router.delete('/:id', productList.deleteProduct)
router.put('/:id', productList.updateProduct)

module.exports = router
