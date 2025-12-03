const Cart = require('../models/cart')

const cartController = {
    getAllCarts: async (req , res) => {
        try {
            const carts = await Cart.getAll()
            res.json({
                success: true,
                data: carts,
                message: 'Carts retrieved successfully'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving carts',
                error: error.message
            })
        }
    },

    getAllCartsByUserID: async (req , res) => {
        try {
            const carts = await Cart.findByUserID(req.params.userID)
            res.json({
                success: true,
                data: carts,
                message: 'Carts retrieved successfully'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving carts',
                error: error.message
            })
        }
    },

    createCart: async (req , res) => {
        try {
            const newCart = await Cart.create(req.params.userID)
            res.status(201).json({
                success: true,
                data: newCart,
                message: 'Cart created successfully'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating cart',
                error: error.message
            })
        }
    },

    deleteCart: async (req, res) => {
        try {
            const deleted = await Cart.delete(req.params.id)
            if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
            }
            res.json({
            success: true,
            message: 'Cart deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting cart',
                error: error.message
            });
        }
    }
}

module.exports = cartController