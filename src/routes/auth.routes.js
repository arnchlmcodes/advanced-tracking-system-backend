const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

// Public Routes
router.post('/login', authController.login);
router.post('/verify-otp', authController.verifyOtp);

// Example protected route for verification/testing
router.get('/me', authenticate, (req, res) => {
    res.json({ success: true, user: req.user });
});

// Example admin only route
router.get('/admin-test', authenticate, authorize('admin'), (req, res) => {
    res.json({ success: true, message: 'Admin access granted' });
});

module.exports = router;
