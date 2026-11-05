
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./routes/api');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS Configuration
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

// API Routes
app.use('/api', routes);

// Backend Health Check
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'SkillBridge API is running successfully!'
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found'
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);

    res.status(500).json({
        success: false,
        message: 'Something went wrong on the server'
    });
});

// MongoDB Connection and Server Start
mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => {
        console.log('Database connected successfully');

        app.listen(port, '0.0.0.0', () => {
            console.log(`SkillBridge server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    });
