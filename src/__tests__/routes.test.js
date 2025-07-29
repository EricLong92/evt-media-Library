const request = require('supertest');
const express = require('express');
const path = require('path');
const videoRoutes = require('../routes/videos');
const uploadRoutes = require('../routes/upload');
const imageRoutes = require('../routes/images');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use('/videos', videoRoutes);
app.use('/upload', uploadRoutes);
app.use('/images', imageRoutes);

describe('Video API', () => {
    test('GET /videos should return 200', async () => {
        const res = await request(app).get('/videos');
        expect(res.statusCode).toBe(200);
    });
});

describe('Upload API', () => {
    test('GET /upload should return 200', async () => {
        const res = await request(app).get('/upload');
        expect(res.statusCode).toBe(200);
    });
});

describe('Image API', () => {
    test('GET /images should return 200', async () => {
        const res = await request(app).get('/images');
        expect(res.statusCode).toBe(200);
    });
});