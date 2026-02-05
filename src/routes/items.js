const express = require('express');
const router = express.Router();
const itemController = require('../controllers/items.controller');
const verifyAuth = require('../middlewares/auth.middleware');

// Public route for discovery (or protected depending on requirements, usually 'search' is public)
// Prompt says "fetch logged-in user's items" (/my) implies authentication needed there.
// "search & discover items" (/items) - typically public if open to guests, but let's assume
// for a tracking system it might need to be at least authenticated to see details.
// However, typically "Lost & Found" boards are visible.
// I will keep it public for now, or if I want to be safe, I can add verifyAuth.
router.get('/', itemController.getAll);

// Protected Routes
router.use(verifyAuth);

router.post('/', itemController.create);
router.post('/:itemId/image', itemController.uploadImage);
router.get('/my', itemController.getMyItems);
router.put('/:itemId', itemController.update);
router.delete('/:itemId', itemController.remove);

module.exports = router;
