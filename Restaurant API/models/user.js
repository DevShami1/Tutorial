const {getPool , sql} = require('../config/database')

class User {
    static async getAll() {
        try {
            const pool = await getPool()
            const result = await pool.request()
            .query('SELECT * FROM Users')
            return result.recordset
        } catch (error) {
            throw error
        }
    }

    static async findByEmail(email) {
        try {
            const pool = await getPool()
            const result = await pool.request()
            .input('email' , sql.NVarChar , email)
            .query('SELECT * FROM Users WHERE email = @email')
            return result.rowsAffected[0] > 0
        } catch (error) {
            throw error
        }
    }

    static async findByEmailAndPassword(email , password) {
        try {
            const pool = await getPool()
            const result = await pool.request()
            .input('email' , sql.NVarChar , email)
            .input('password' , sql.NVarChar , password)
            .query('SELECT * FROM Users WHERE email = @email AND password = @password')
            return result.recordset[0]
        } catch (error) {
            throw error
        }
    }

    static async create(account) {
        try {
            const {username , email , password} = account
            const pool = await getPool()
            const result = await pool.request()
            .input('username' , sql.NVarChar , username)
            .input('email' , sql.NVarChar , email)
            .input('password' , sql.NVarChar , password)
            .query('INSERT INTO Users(username , email , password) OUTPUT INSERTED.* VALUES (@username , @email , @password)')
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
            .query('DELETE FROM Users WHERE Id = @id');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User