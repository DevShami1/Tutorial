const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

router.get('/' , orderController.getAllOrders)
router.get('/:cartID' , orderController.getOrderByCartID)
router.post('/' , orderController.createOrder)
router.delete('/:id' , orderController.deleteOrder)

module.exports = router