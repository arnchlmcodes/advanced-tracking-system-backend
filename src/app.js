const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const featureXRoutes = require('./routes/featureX.routes');

const { error } = require('./utils/response');

const app = express();

// Middlewares
app.use(helmet());            // Secure HTTP headers
app.use(cors());              // Enable CORS
app.use(morgan('dev'));       // HTTP request logger
app.use(express.json());      // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/featureX', featureXRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('Advanced Tracking System Backend API is running...');
});

// 404 Handler
app.use((req, res, next) => {
    error(res, 'Resource not found', 404);
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    error(res, 'Internal Server Error', 500, err.message);
});

module.exports = app;
