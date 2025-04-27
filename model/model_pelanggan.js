const connection = require('../config/database')

class model_pelanggan {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM pelanggan`, (err, rows) => {
                if (err) reject(err)
                else resolve(rows)
            })
        })
    }

    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO pelanggan SET ?`, data, (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }

    static async getId(id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM pelanggan WHERE id_pelanggan = ?`, [id], (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }

    static async update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE pelanggan SET ? WHERE id_pelanggan = ?`, [data, id], (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM pelanggan WHERE id_pelanggan = ?`, [id], (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }
}

module.exports = model_pelanggan
