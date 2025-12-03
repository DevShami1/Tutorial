const CartItem = require('../models/cartItem')

const cartItemController = {
    getAllCartItems: async (req , res) => {
        try {
            const cartItems = await CartItem.getAll()
            res.json({
                success: true,
                data: cartItems,
                message: 'CartItems retrieved successfully'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving cartItems',
                error: error.message
            })
        }
    },

    getAllCartItemsByCartID: async (req , res) => {
        try {
            const cartItems = await CartItem.findByCartID(req.params.cartID)
            res.json({
                success: true,
                data: cartItems,
                message: 'CartItems retrieved successfully'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving cartItems',
                error: error.message
            })
        }
    },

    createCartItem: async (req , res) => {
        try {
            const newCartItem = await CartItem.create(req.body)
            res.status(201).json({
                success: true,
                data: newCartItem,
                message: 'CartItem created successfully'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating cartItem',
                error: error.message
            })
        }
    },

    deleteCartItem: async (req, res) => {
        try {
            const deleted = await CartItem.delete(req.params.id)
            if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'CartItem not found'
            });
            }
            res.json({
            success: true,
            message: 'CartItem deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting cartItem',
                error: error.message
            });
        }
    }
}

module.exports = cartItemController