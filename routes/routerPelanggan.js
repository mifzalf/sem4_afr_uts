const express = require('express');
const router = express.Router();
const model_pelanggan = require('../model/model_pelanggan');

// GET all pelanggan
router.get('/', async (req, res, next) => {
    try {
        const rows = await model_pelanggan.getAll();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET pelanggan by ID
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const rows = await model_pelanggan.getId(id);
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'Data pelanggan tidak ditemukan' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST tambah pelanggan baru
router.post('/store', async (req, res, next) => {
    const { nama, email, no_hp } = req.body;
    const data = { nama, email, no_hp };

    try {
        await model_pelanggan.store(data);
        res.status(200).json({ message: 'Pelanggan berhasil ditambahkan' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH update pelanggan
router.patch('/update/:id', async (req, res, next) => {
    const id = req.params.id;
    const { nama, email, no_hp } = req.body;
    const data = { nama, email, no_hp };

    try {
        const rows = await model_pelanggan.getId(id);
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'Data pelanggan tidak ditemukan' });
        }

        await model_pelanggan.update(id, data);
        res.status(200).json({ message: 'Pelanggan berhasil diupdate' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE pelanggan
router.delete('/delete/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const rows = await model_pelanggan.getId(id);
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'Data pelanggan tidak ditemukan' });
        }

        await model_pelanggan.delete(id);
        res.status(200).json({ message: 'Pelanggan berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
