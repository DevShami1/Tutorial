const express = require('express')
const router = express.Router()
const tableReservationController = require('../controllers/tableReservationController')

router.get('/' , tableReservationController.getAllTables)
router.get('/:userID' , tableReservationController.getAllTablesByUserID)
router.post('/' , tableReservationController.createTable)
router.delete('/:id' , tableReservationController.deleteTable)

module.exports = router