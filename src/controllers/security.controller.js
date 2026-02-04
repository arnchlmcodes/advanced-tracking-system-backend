const { success, error } = require('../utils/response');
const { admin, db } = require('../config/firebase');
const notificationService = require('../services/notification.service');
const abuseService = require('../services/abuse.service');
// const db = admin.firestore(); // db is already imported

class SecurityController {

    /**
     * Get user's security notifications
     */
    async getNotifications(req, res) {
        try {
            const uid = req.user.uid;
            const snapshot = await db.collection('security_notifications')
                .where('userId', '==', uid)
                .orderBy('createdAt', 'desc')
                .limit(20)
                .get();

            const notifications = [];
            snapshot.forEach(doc => {
                notifications.push({ id: doc.id, ...doc.data() });
            });

            return success(res, notifications);
        } catch (err) {
            console.error('getNotifications error:', err);
            return error(res, 'Failed to fetch notifications', 500);
        }
    }

    /**
     * Get user's recent security activity (from audit logs)
     */
    async getActivity(req, res) {
        try {
            const uid = req.user.uid;
            // Get actions where user is the actor OR the target (entityId)
            // Note: Use simple query for now. Complex OR queries might need index.
            // Focusing on actions DONE BY the user for "My Activity"

            const snapshot = await db.collection('audit_logs')
                .where('actorId', '==', uid)
                .orderBy('timestamp', 'desc')
                .limit(20)
                .get();

            const activities = [];
            snapshot.forEach(doc => {
                activities.push({ id: doc.id, ...doc.data() });
            });

            return success(res, activities);
        } catch (err) {
            console.error('getActivity error:', err);
            return error(res, 'Failed to fetch activity', 500);
        }
    }

    /**
     * Get current account status and abuse score (contextual)
     */
    async getAccountStatus(req, res) {
        try {
            const uid = req.user.uid;

            // Fetch latest user status from users collection
            const userDoc = await db.collection('users').doc(uid).get();
            if (!userDoc.exists) return error(res, 'User not found', 404);

            const userData = userDoc.data();
            const abuseData = await abuseService.getScore(uid);

            const status = {
                accountStatus: userData.status || 'active', // active, suspended, blocked
                isFlagged: abuseData.flagged || false,
                // Do not show raw score to user, only status
            };

            return success(res, status);
        } catch (err) {
            console.error('getAccountStatus error:', err);
            return error(res, 'Failed to fetch account status', 500);
        }
    }

    /**
     * Get active warnings
     */
    async getWarnings(req, res) {
        try {
            const uid = req.user.uid;
            const snapshot = await db.collection('security_notifications')
                .where('userId', '==', uid)
                .where('type', '==', 'WARNING')
                .orderBy('createdAt', 'desc')
                .get();

            const warnings = [];
            snapshot.forEach(doc => {
                warnings.push({ id: doc.id, ...doc.data() });
            });

            return success(res, warnings);
        } catch (err) {
            console.error('getWarnings error:', err);
            return error(res, 'Failed to fetch warnings', 500);
        }
    }
}

module.exports = new SecurityController();
