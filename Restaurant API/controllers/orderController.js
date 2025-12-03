const Order = require('../models/order')

const orderController = {
    getAllOrders: async (req , res) => {
        try {
            const orders = await Order.getAll()
            res.json({
                success: true,
                data: orders,
                message: 'Orders retrieved successfully'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving orders',
                error: error.message
            })
        }
    },

    getOrderByCartID: async (req , res) => {
        try {
            const order = await Order.findByCartID(req.params.cartID)
            res.json({
                success: true,
                data: order,
                message: 'Order retrieved successfully'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving order',
                error: error.message
            })
        }
    },

    createOrder: async (req , res) => {
        try {
            const newOrder = await Order.create(req.body)
            res.status(201).json({
                success: true,
                data: newOrder,
                message: 'Order created successfully'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating order',
                error: error.message
            })
        }
    },

    deleteOrder: async (req, res) => {
        try {
            const deleted = await Order.delete(req.params.id)
            if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
            }
            res.json({
            success: true,
            message: 'Order deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting order',
                error: error.message
            });
        }
    }
}

module.exports = orderController