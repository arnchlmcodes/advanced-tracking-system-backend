const express = require('express');
const router = express.Router();
const featureXController = require('../controllers/featureX.controller');
const verifyAuth = require('../middlewares/auth.middleware');

// Optional: Protect routes
// router.use(verifyAuth);

router.get('/', featureXController.getFeatureData);
router.post('/', featureXController.createFeatureItem);

module.exports = router;
