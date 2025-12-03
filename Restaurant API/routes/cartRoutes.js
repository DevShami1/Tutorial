const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')

router.get('/' , cartController.getAllCarts)
router.get('/:userID' , cartController.getAllCartsByUserID)
router.post('/:userID' , cartController.createCart)
router.delete('/:id' , cartController.deleteCart)

module.exports = router