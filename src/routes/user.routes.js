const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyAuth = require('../middlewares/auth.middleware');

// Protect these routes
router.use(verifyAuth);

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

module.exports = router;
