const express = require('express')
const router = express.Router()
const cartItemController = require('../controllers/cartItemController')

router.get('/' , cartItemController.getAllCartItems)
router.get('/:cartID' , cartItemController.getAllCartItemsByCartID)
router.post('/' , cartItemController.createCartItem)
router.delete('/:id' , cartItemController.deleteCartItem)

module.exports = router