const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const imagesDirectory = path.join(__dirname, '../../images');

// API trả về danh sách ảnh
router.get('/', (req, res) => {
    fs.readdir(imagesDirectory, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to fetch images' });
        }
        // Lọc các file ảnh hợp lệ
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.json(imageFiles.map(file => `${file}`));
    });
});

// API xoá ảnh
router.delete('/:name', (req, res) => {
    const imageName = req.params.name;
    const imagePath = path.join(imagesDirectory, imageName);
    fs.unlink(imagePath, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Xoá ảnh thất bại' });
        }
        res.json({ success: true });
    });
});

module.exports = router;