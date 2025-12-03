const Category = require('../models/category')

const categoryController = {
    getAllCategories : async (req , res) => {
        try {
            const categories = await Category.getAll()
            res.json({
                success: true,
                data: categories,
                message: 'Categories retrieved successfully'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving categories',
                error: error.message
            })
        }
    }
}

module.exports = categoryController
