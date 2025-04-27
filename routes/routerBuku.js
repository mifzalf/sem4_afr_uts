const express = require('express');
const router = express.Router();
const model_buku = require('../model/model_buku');

// GET all buku
router.get('/', async (req, res, next) => {
    try {
        const rows = await model_buku.getAll();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET buku by ID
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const rows = await model_buku.getId(id);
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'Data buku tidak ditemukan' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST tambah buku baru
router.post('/store', async (req, res, next) => {
    const { judul, penulis, harga } = req.body;
    const data = { judul, penulis, harga };

    try {
        await model_buku.store(data);
        res.status(200).json({ message: 'Buku berhasil ditambahkan' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH update buku
router.patch('/update/:id', async (req, res, next) => {
    const id = req.params.id;
    const { judul, penulis, harga } = req.body;
    const data = { judul, penulis, harga };

    try {
        const rows = await model_buku.getId(id);
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'Data buku tidak ditemukan' });
        }

        await model_buku.update(id, data);
        res.status(200).json({ message: 'Buku berhasil diupdate' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE buku
router.delete('/delete/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const rows = await model_buku.getId(id);
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'Data buku tidak ditemukan' });
        }

        await model_buku.delete(id);
        res.status(200).json({ message: 'Buku berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
