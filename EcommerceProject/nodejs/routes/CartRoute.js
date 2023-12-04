const express = require('express')
const   router = express.Router()
const cartList = require('../component/AddToCart')

router.get('/', cartList.getCart);
router.post('/:id', cartList.PostCart);
router.delete('/:id', cartList.deleteCart);
router.patch('/:id', cartList.updateCart);

module.exports = router
