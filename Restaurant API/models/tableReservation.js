const {getPool , sql} = require('../config/database')

class TableReservation {
    static async getAll() {
        try {
            const pool = await getPool()
            const result = await pool.request()
            .query('SELECT * FROM TableReservations')
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
            .query('SELECT * FROM TableReservations WHERE userID = @userID')
            return result.recordset
        } catch (error) {
            throw error
        }
    }

    static async create(reservationInfo) {
        try {
            const {userID , phoneNumber , numberOfGuests , reservationDate} = reservationInfo
            const pool = await getPool()
            const result = await pool.request()
            .input('userID' , sql.Int , userID)
            .input('phoneNumber' , sql.VarChar , phoneNumber)
            .input('numberOfGuests' , sql.Int , numberOfGuests)
            .input('reservationDate' , sql.DateTime , reservationDate)
            .query('INSERT INTO TableReservations(userID , phoneNumber , numberOfGuests , reservationDate) OUTPUT INSERTED.* VALUES (@userID , @phoneNumber , @numberOfGuests , @reservationDate)')
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
            .query('DELETE FROM TableReservations WHERE id = @id')
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error
        }
    }
}

module.exports = TableReservation