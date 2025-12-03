const {getPool , sql} = require('../config/database')

class Cart {
    static async getAll() {
        try {
            const pool = await getPool()
            const result = await pool.request().query('SELECT * FROM Carts ORDER BY dateCreated DESC')
            return result.recordset
        } catch (error) {
            throw error
        }
    }

    static async findByUserID(userID) {
        try {
            const pool = await getPool()
            const result = await pool.request()
            .input('userID' , sql.Int , userID)
            .query('SELECT * FROM Carts WHERE userID = @userID ORDER BY dateCreated DESC')
            return result.recordset
        } catch (error) {
            throw error
        }
    }

    static async create(userID) {
        try {
            const pool = await getPool()
            const result = await pool.request()
            .input('userID' , sql.Int , userID)
            .query('INSERT INTO Carts(userID) OUTPUT INSERTED.* VALUES (@userID)')
            return result.recordset[0]
        } catch (error) {
            throw error
        }
    }

    static async delete(id) {
        try {
            const pool = await getPool()
            const result = await pool.request()
            .input('id' , sql.Int , id)
            .query('DELETE FROM Carts WHERE id = @id')
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error
        }
    }
}

module.exports = Cart