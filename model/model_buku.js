const connection = require('../config/database')

class model_buku {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM buku`, (err, rows) => {
                if (err) reject(err)
                else resolve(rows)
            })
        })
    }

    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO buku SET ?`, data, (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }

    static async getId(id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM buku WHERE id_buku = ?`, [id], (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }

    static async update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE buku SET ? WHERE id_buku = ?`, [data, id], (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM buku WHERE id_buku = ?`, [id], (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }
}

module.exports = model_buku
