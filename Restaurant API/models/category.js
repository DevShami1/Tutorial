const {getPool , sql} = require('../config/database')

class Category {
    static async getAll() {
        try {
            const pool = await getPool()
            const result = await pool.request().query('SELECT * FROM Categories')
            return result.recordset
        } catch (error) {
            throw error
        }
    }
}

module.exports = Category