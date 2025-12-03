const {getPool , sql} = require('../config/database')

class Order {
    static async getAll() {
        try {
            const pool = await getPool()
            const result = await pool.request()
            .query('SELECT * FROM Orders')
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
            .query('SELECT * FROM Orders WHERE cartID = @cartID')
            return result.recordset[0]
        } catch (error) {
            throw error
        }
    }

    static async create(orderInfo) {
        try {
            const {cartID , location , phoneNumber , orderTime , receiveTime} = orderInfo
            const pool = await getPool()
            const result = await pool.request()
            .input('cartID' , sql.Int , cartID)
            .input('location' , sql.NVarChar , location)
            .input('phoneNumber' , sql.VarChar , phoneNumber)
            .input('orderTime' , sql.DateTime , orderTime)
            .input('receiveTime' , sql.DateTime , receiveTime)
            .query('INSERT INTO Orders(cartID , location , phoneNumber , orderTime , receiveTime) OUTPUT INSERTED.* VALUES (@cartID , @location , @phoneNumber , @orderTime , @receiveTime)')
            return result.recordset[0]
        } catch (error) {
            throw error
        }
    }

    static async delete(id) {
        try {
            const pool = await getPool();
            const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Orders WHERE Id = @id');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Order