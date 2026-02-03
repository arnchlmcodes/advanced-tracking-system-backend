const express = require('express');
const router = express.Router();
const claimsController = require('../controllers/claims.controller');
const verifyAuth = require('../middlewares/auth.middleware');

// Protect all routes
router.use(verifyAuth);

// User Routes
router.post('/claims', claimsController.createClaim);
router.get('/claims/my', claimsController.getMyClaims);

// Admin Routes
router.get('/admin/claims/pending', claimsController.getPendingClaims);
router.post('/admin/claims/:id/approve', claimsController.approveClaim);
router.post('/admin/claims/:id/reject', claimsController.rejectClaim);

module.exports = router;
