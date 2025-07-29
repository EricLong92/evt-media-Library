const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const videoFolder = path.join(__dirname, '../../videos');
const imageFolder = path.join(__dirname, '../../images');

// Hàm loại bỏ dấu tiếng Việt và thay dấu cách bằng '-'
function removeVietnameseTones(str) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Bỏ dấu
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .replace(/\s+/g, '-') // Thay dấu cách bằng '-'
        .replace(/[^a-zA-Z0-9\-\.]/g, '') // Loại bỏ ký tự đặc biệt trừ '-' và '.'
        .toLowerCase();
}

// Multer config cho video
const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, videoFolder);
    },
    filename: (req, file, cb) => {
        const originalName = path.parse(file.originalname).name;
        const ext = path.extname(file.originalname);
        const safeName = removeVietnameseTones(originalName) + ext;
        cb(null, safeName);
    }
});

// Multer config cho ảnh
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imageFolder);
    },
    filename: (req, file, cb) => {
        const originalName = path.parse(file.originalname).name;
        const ext = path.extname(file.originalname);
        const safeName = removeVietnameseTones(originalName) + ext;
        cb(null, safeName);
    }
});

const uploadVideo = multer({ storage: videoStorage });
const uploadImage = multer({ storage: imageStorage });

// Hiển thị form upload và danh sách video/ảnh
router.get('/', (req, res) => {
    fs.readdir(videoFolder, (err, videoFiles) => {
        if (err) videoFiles = [];
        videoFiles = videoFiles.filter(file => /\.(mp4|webm|ogg)$/i.test(file));
        fs.readdir(imageFolder, (err2, imageFiles) => {
            if (err2) imageFiles = [];
            imageFiles = imageFiles.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
            res.render('upload', { videos: videoFiles, images: imageFiles });
        });
    });
});

// Xử lý upload video
router.post('/video', uploadVideo.single('video'), (req, res) => {
    if (!req.file) return res.status(400).send('No video uploaded.');
    res.redirect('/upload');
});

// Xử lý upload ảnh
router.post('/image', uploadImage.single('image'), (req, res) => {
    if (!req.file) return res.status(400).send('No image uploaded.');
    res.redirect('/upload');
});

module.exports = router;