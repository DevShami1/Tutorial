const express = require('express')
const router = express.Router()
const menuItemController = require('../controllers/menuItemController')

router.get('/' , menuItemController.getAllMenuItems)
router.get('/:categoryID' , menuItemController.getMenuItemsByCategoryID)

module.exports = router