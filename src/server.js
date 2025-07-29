const express = require('express');
const path = require('path');
const videoRoutes = require('./routes/videos');
const uploadRoutes = require('./routes/upload');
const imageRoutes = require('./routes/images'); // Thêm dòng này
const fs = require('fs');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../images'))); // Thêm dòng này

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/videos', videoRoutes);
app.use('/upload', uploadRoutes);
app.use('/images', imageRoutes); // Thêm dòng này

// Home route
app.get('/', (req, res) => {
    const videosDirectory = path.join(__dirname, '../../videos');
    console.log('Serving videos from:', videosDirectory);
    fs.readdir(videosDirectory, (err, files) => {
        if (err) {
            console.error('Error reading videos directory:', err);
            return res.render('homepage', { videos: [] });
        }
        console.log('Files in videos directory:', files);
        const videoFiles = files.filter(file => /\.(mp4|webm|ogg)$/i.test(file));
        res.render('homepage', { videos: videoFiles });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});