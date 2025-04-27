const express = require('express');
const router = express.Router();
const model_transaksi = require('../model/model_transaksi');

// GET all transaksi with related data
router.get('/', async (req, res, next) => {
    try {
        const rows = await model_transaksi.getAll();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET transaksi by ID with related data
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const rows = await model_transaksi.getId(id);
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'Data transaksi tidak ditemukan' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST tambah transaksi baru
router.post('/store', async (req, res, next) => {
    const { id_pelanggan, id_buku, tanggal, jumlah } = req.body;
    const data = { id_pelanggan, id_buku, tanggal, jumlah };

    try {
        await model_transaksi.store(data);
        res.status(200).json({ message: 'Transaksi berhasil ditambahkan' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH update transaksi
router.patch('/update/:id', async (req, res, next) => {
    const id = req.params.id;
    const { id_pelanggan, id_buku, tanggal, jumlah } = req.body;
    const data = { id_pelanggan, id_buku, tanggal, jumlah };

    try {
        const rows = await model_transaksi.getId(id);
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'Data transaksi tidak ditemukan' });
        }

        await model_transaksi.update(id, data);
        res.status(200).json({ message: 'Transaksi berhasil diupdate' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE transaksi
router.delete('/delete/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const rows = await model_transaksi.getId(id);
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'Data transaksi tidak ditemukan' });
        }

        await model_transaksi.delete(id);
        res.status(200).json({ message: 'Transaksi berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
