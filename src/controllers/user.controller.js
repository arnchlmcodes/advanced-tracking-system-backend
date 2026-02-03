const { success, error } = require('../utils/response');
const firebaseService = require('../services/firebase.service');

const getProfile = async (req, res) => {
    try {
        // req.user is populated by auth middleware
        const uid = req.user.uid;
        const userRecord = await firebaseService.getUser(uid);

        return success(res, userRecord);
    } catch (err) {
        return error(res, 'Failed to fetch profile', 500, err);
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
