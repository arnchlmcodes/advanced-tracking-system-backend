const express = require('express');
const router = express.Router();
const claimsController = require('../controllers/claims.controller');
const verifyAuth = require('../middlewares/auth.middleware');

// Protect all routes
router.use(verifyAuth);

// User Routes
router.post('/claims', claimsController.createClaim);
router.get('/claims/my', claimsController.getMyClaims);

// Chat & Communication (User + Admin)
router.post('/claims/:id/chat', claimsController.sendMessage);
router.get('/claims/:id/chat', claimsController.getMessages);

// Admin Routes
router.get('/admin/claims/pending', claimsController.getPendingClaims);
router.post('/admin/claims/:id/approve', claimsController.approveClaim);
// Admin Routes
router.get('/admin/claims/pending', claimsController.getPendingClaims);
router.post('/admin/claims/:id/approve', claimsController.approveClaim);
router.post('/admin/claims/:id/reject', claimsController.rejectClaim);
router.post('/admin/claims/:id/reopen', claimsController.reopenClaim);
router.post('/admin/claims/:id/notes', claimsController.addNote);
router.get('/admin/claims/:id/evidence', claimsController.getEvidence);
router.post('/admin/claims/:id/request-proof', claimsController.requestProof);
router.get('/admin/analytics', claimsController.getAnalytics);

module.exports = router;
