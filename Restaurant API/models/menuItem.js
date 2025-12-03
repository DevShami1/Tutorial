const {getPool , sql} = require('../config/database')

class MenuItem {
    static async getAll() {
        try {
            const pool = await getPool()
            const result = await pool.request().query('SELECT * FROM MenuItems')
            return result.recordset
        } catch (error) {
            throw error
        }
    }

    static async findByCategoryID(categoryID) {
        try {
            const pool = await getPool()
            const result = await pool.request()
            .input('categoryID' , sql.Int , categoryID)
            .query('SELECT * FROM MenuItems WHERE categoryID = @categoryID')
            return result.recordset
        } catch (error) {
            throw error
        }
    }
}

module.exports = MenuItem