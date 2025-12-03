const MenuItem = require('../models/menuItem')

const menuItemController = {
    getAllMenuItems: async (req , res) => {
        try {
            const menuItems = await MenuItem.getAll()
            res.json({
                success: true,
                data: menuItems,
                message: 'MenuItems retrieved successfully'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving menuItems',
                error: error.message
            })
        }
    },

    getMenuItemsByCategoryID: async (req , res) => {
        try {
            const menuItems = await MenuItem.findByCategoryID(req.params.categoryID)
            res.json({
                success: true,
                data: menuItems,
                message: 'MenuItems retrieved successfully'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving menuItems',
                error: error.message
            })
        }
    }
}

module.exports = menuItemController