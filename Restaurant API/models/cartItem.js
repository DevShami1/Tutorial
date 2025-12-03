const {getPool , sql} = require('../config/database')

class CartItem {
    static async getAll() {
        try {
            const pool = await getPool()
            const result = await pool.request().query('SELECT * FROM CartItems')
            return result.recordset
        } catch (error) {
            throw error
        }
    }

    static async findByCartID(cartID) {
        try {
            const pool = await getPool()
            const result = await pool.request()
            .input('cartID' , sql.Int , cartID)
            .query('SELECT * FROM CartItems WHERE cartID = @cartID')
            return result.recordset
        } catch (error) {
            throw error
        }
    }

    static async create(cartItem) {
        try {
            const {cartID , menuItemID , quantity} = cartItem
            const pool = await getPool()
            const result = await pool.request()
            .input('cartID' , sql.Int , cartID)
            .input('menuItemID' , sql.Int , menuItemID)
            .input('quantity' , sql.Int , quantity)
            .query(`
                INSERT INTO CartItems (cartID, menuItemID, quantity)
                VALUES (@cartID, @menuItemID, @quantity);

                SELECT * FROM CartItems WHERE id = SCOPE_IDENTITY();
            `)
            return result.recordset[0]  // first row from the SELECT
        } catch (error) {
            throw error
        }
    }

    static async delete(id) {
        try {
            const pool = await getPool()
            const result = await pool.request()
            .input('id' , sql.Int , id)
            .query('DELETE FROM CartItems WHERE id = @id')
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error
        }
    }
}

module.exports = CartItem