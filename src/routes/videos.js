const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const videosDirectory = path.join(__dirname, '../../videos');

// Trả về danh sách video
router.get('/', (req, res) => {
    fs.readdir(videosDirectory, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to fetch videos' });
        }
        const videoFiles = files.filter(file => /\.(mp4|webm|ogg)$/i.test(file));
        res.json(videoFiles.map(file => `${file}`));
    });
});

// Xoá video
router.delete('/:name', (req, res) => {
    const videoName = req.params.name;
    const videoPath = path.join(videosDirectory, videoName);
    fs.unlink(videoPath, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Xoá video thất bại' });
        }
        res.json({ success: true });
    });
});

// Cho phép truy cập file video trực tiếp
router.use(express.static(videosDirectory));

module.exports = router;