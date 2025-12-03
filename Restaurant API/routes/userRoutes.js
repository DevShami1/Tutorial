const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/', userController.getAllUsers);
router.get('/find', userController.getUserByEmailAndPassword);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;