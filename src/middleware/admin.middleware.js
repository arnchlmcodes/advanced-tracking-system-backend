const { admin, db } = require('../config/firebase');

/**
 * Middleware to verify if the user is an Admin.
 * STRICTLY checks Firestore for the 'role' field.
 * Assumes req.user is already populated by auth.middleware.js
 */
const verifyAdmin = async (req, res, next) => {
    try {
        if (!req.user || !req.user.uid) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: User not authenticated'
            });
        }

        const uid = req.user.uid;
        // const db = admin.firestore(); // db is imported

        // Fetch user document from Firestore to get the TRUSTED role
        const userDoc = await db.collection('users').doc(uid).get();

        if (!userDoc.exists) {
            return res.status(403).json({
                success: false,
                message: 'Access denied: User profile not found'
            });
        }

        const userData = userDoc.data();

        if (userData.role !== 'admin') {
            console.warn(`[Security] User ${uid} attempted admin access but has role: ${userData.role}`);
            return res.status(403).json({
                success: false,
                message: 'Access denied: Admins only'
            });
        }

        // Attach full user data for controller use if needed
        req.userProfile = userData;
        next();

    } catch (error) {
        console.error('Admin verification error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during role verification'
        });
    }
};

module.exports = verifyAdmin;
