const TableReservation = require('../models/tableReservation')

const tableReservationController = {
    getAllTables: async (req , res) => {
        try {
            const tables = await TableReservation.getAll()
            res.json({
                success: true,
                data: tables,
                message: 'Tables retrieved successfully'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving tables',
                error: error.message
            })
        }
    },

    getAllTablesByUserID: async (req , res) => {
        try {
            const tables = await TableReservation.findByUserID(req.params.userID)
            res.json({
                success: true,
                data: tables,
                message: 'Tables retrieved successfully'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving tables',
                error: error.message
            })
        }
    },

    createTable: async (req , res) => {
        try {
            const newTable = await TableReservation.create(req.body)
            res.status(201).json({
                success: true,
                data: newTable,
                message: 'Table created successfully'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating table',
                error: error.message
            })
        }
    },

    deleteTable: async (req, res) => {
        try {
            const deleted = await TableReservation.delete(req.params.id)
            if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Table not found'
            });
            }
            res.json({
            success: true,
            message: 'Table deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting table',
                error: error.message
            });
        }
    }
}

module.exports = tableReservationController