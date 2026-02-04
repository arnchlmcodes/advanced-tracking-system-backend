const express = require('express');
const router = express.Router();
const securityController = require('../controllers/security.controller');
const verifyAuth = require('../middlewares/auth.middleware');
const rateLimit = require('../middleware/rateLimit.middleware');

// Apply auth to all routes
router.use(verifyAuth);

// Specific rate limit for security reads (e.g., 50 req/15min)
const securityLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50 });

router.get('/notifications', securityLimiter, securityController.getNotifications);
router.get('/activity', securityLimiter, securityController.getActivity);
router.get('/account-status', securityLimiter, securityController.getAccountStatus);
router.get('/warnings', securityLimiter, securityController.getWarnings);

module.exports = router;
