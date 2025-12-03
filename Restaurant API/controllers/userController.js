const User = require('../models/user')

const userController = {
    getAllUsers : async (req , res) => {
        try {
            const users = await User.getAll()
            res.json({
                success: true,
                data: users,
                message: 'Users retrieved successfully'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving users',
                error: error.message
            })
        }
    },

    getUserByEmailAndPassword : async (req , res) => {
        try {
            const user = await User.findByEmailAndPassword(req.query.email , req.query.password)
            if(!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User NOT found'
                })
            }
            res.json({
                success: true,
                data: user,
                message: 'User retrieved successfully'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving user',
                error: error.message
            })
        }
    },

    createUser: async (req, res) => {
        try {
            const account = req.body
            const user = await User.findByEmail(account.email)
            if(user) {
                return res.status(500).json({
                    success: false,
                    message: 'User has already exists'
                })
            }
            const newUser = await User.create(account)
            res.status(201).json({
                success: true,
                data: newUser,
                message: 'User created successfully'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating user',
                error: error.message
            })
        }
    },

    deleteUser: async (req, res) => {
        try {
            const deleted = await User.delete(req.params.id);
            if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
            }
            res.json({
            success: true,
            message: 'User deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting user',
                error: error.message
            });
        }
    }
}

module.exports = userController