const connection = require('../config/database')

class model_transaksi {
    static async getAll() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT
                    tr.id_transaksi,
                    tr.tanggal,
                    tr.jumlah,
                    p.nama AS nama_pelanggan,
                    b.judul AS judul_buku
                FROM 
                    transaksi tr
                JOIN 
                    pelanggan p ON tr.id_pelanggan = p.id_pelanggan
                JOIN 
                    buku b ON tr.id_buku = b.id_buku
                ORDER BY 
                    tr.id_transaksi DESC
            `
            connection.query(query, (err, rows) => {
                if (err) reject(err)
                else resolve(rows)
            })
        })
    }

    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO transaksi SET ?`, data, (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }

    static async getId(id) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    tr.id_transaksi,
                    tr.tanggal,
                    tr.jumlah,
                    p.nama AS nama_pelanggan,
                    b.judul AS judul_buku
                FROM 
                    transaksi tr
                JOIN 
                    pelanggan p ON tr.id_pelanggan = p.id_pelanggan
                JOIN 
                    buku b ON tr.id_buku = b.id_buku
                WHERE 
                    tr.id_transaksi = ?
            `
            connection.query(query, [id], (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }

    static async update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE transaksi SET ? WHERE id_transaksi = ?`, [data, id], (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM transaksi WHERE id_transaksi = ?`, [id], (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }
}

module.exports = model_transaksi
