const express = require('express');
const router = express.Router();
const adminSecurityController = require('../controllers/admin.security.controller');
const verifyAuth = require('../middlewares/auth.middleware');
const verifyAdmin = require('../middleware/admin.middleware');
const rateLimit = require('../middleware/rateLimit.middleware');

// Protect all routes with Auth + Admin Check
router.use(verifyAuth);
router.use(verifyAdmin);

// Rate limiter for admin actions (liberal but present)
const adminLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
router.use(adminLimiter);

router.get('/overview', adminSecurityController.getOverview);
router.post('/enforce', adminSecurityController.enforceAction);
router.get('/audit-logs', adminSecurityController.getAuditLogs);

module.exports = router;
