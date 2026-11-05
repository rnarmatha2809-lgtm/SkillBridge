
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const routes = require('./routes/api');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

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

// API routes
app.use('/api', routes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        message: 'Something went wrong on the server'
    });
});

// Serve React production build
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Handle React frontend routes
app.get('*', (req, res) => {
    res.sendFile(
        path.join(__dirname, 'client', 'dist', 'index.html')
    );
});

// Start server after MongoDB connects
mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => {
        console.log('Database connected successfully');

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err.message);
    });
