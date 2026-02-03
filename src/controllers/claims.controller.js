const claimsService = require('../services/claims.service');
const { success, error } = require('../utils/response');

// Helper to check admin status
const isAdmin = (user) => {
    // Check for standard Firebase admin claim or custom role field
    return user.admin === true || user.role === 'admin';
};

const createClaim = async (req, res) => {
    try {
        const { itemId } = req.body;
        const uid = req.user.uid;

        if (!itemId) {
            return error(res, 'ItemId is required', 400);
        }

        const result = await claimsService.createClaim(itemId, uid);
        return success(res, result, 'Claim submitted successfully', 201);
    } catch (err) {
        if (err.message.includes('Duplicate claim')) {
            return error(res, err.message, 400);
        }
        return error(res, 'Failed to create claim', 500, err.message);
    }
};

const getMyClaims = async (req, res) => {
    try {
        const uid = req.user.uid;
        const claims = await claimsService.getMyClaims(uid);
        return success(res, claims);
    } catch (err) {
        return error(res, 'Failed to fetch your claims', 500, err.message);
    }
};

const getPendingClaims = async (req, res) => {
    try {
        if (!isAdmin(req.user)) {
            return error(res, 'Forbidden: Admin access only', 403);
        }

        const claims = await claimsService.getPendingClaims();
        return success(res, claims);
    } catch (err) {
        return error(res, 'Failed to fetch pending claims', 500, err.message);
    }
};

const approveClaim = async (req, res) => {
    try {
        if (!isAdmin(req.user)) {
            return error(res, 'Forbidden: Admin access only', 403);
        }

        const { id } = req.params;
        const result = await claimsService.approveClaim(id);
        return success(res, result, 'Claim approved');
    } catch (err) {
        if (err.message === 'Claim not found') {
            return error(res, err.message, 404);
        }
        if (err.message === 'Claim is not pending') {
            return error(res, err.message, 400);
        }
        return error(res, 'Failed to approve claim', 500, err.message);
    }
};

const rejectClaim = async (req, res) => {
    try {
        if (!isAdmin(req.user)) {
            return error(res, 'Forbidden: Admin access only', 403);
        }

        const { id } = req.params;
        const result = await claimsService.rejectClaim(id);
        return success(res, result, 'Claim rejected');
    } catch (err) {
        return error(res, 'Failed to reject claim', 500, err.message);
    }
};

module.exports = {
    createClaim,
    getMyClaims,
    getPendingClaims,
    approveClaim,
    rejectClaim
};
