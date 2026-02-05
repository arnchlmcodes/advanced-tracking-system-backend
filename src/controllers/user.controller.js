const { success, error } = require('../utils/response');
const firebaseService = require('../services/firebase.service');

const getProfile = async (req, res) => {
    try {
        // req.user is populated by auth middleware
        const uid = req.user.uid;

        // Mock response for dev/testing environment
        if (uid === 'test-user-123') {
            return success(res, {
                uid: 'test-user-123',
                email: 'test@example.com',
                displayName: 'Test User',
                role: 'admin'
            });
        }

        const userRecord = await firebaseService.getUser(uid);

        return success(res, userRecord);
    } catch (err) {
        if (err.code === 'auth/user-not-found') {
            return error(res, 'User not found', 404);
        }
        return error(res, 'Failed to fetch profile', 500, err.message);
    }
};

const updateProfile = async (req, res) => {
    try {
        // Update logic
        return success(res, req.body, 'Profile updated');
    } catch (err) {
        return error(res, 'Failed to update profile', 500, err);
    }
}

module.exports = {
    getProfile,
    updateProfile
};
