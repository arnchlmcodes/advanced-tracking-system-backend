const { admin, db } = require('../config/firebase');

class NotificationService {
    constructor() {
        this.collection = db.collection('security_notifications');
    }

    /**
     * Create a security notification for a user.
     * @param {string} userId - Target user UID
     * @param {string} type - 'INFO', 'WARNING', 'CRITICAL', 'STATUS_CHANGE'
     * @param {string} message - User-facing message
     * @param {Object} metadata - Optional context
     */
    async createSecurityNotification(userId, type, message, metadata = {}) {
        try {
            const notification = {
                userId,
                type,
                message,
                metadata,
                read: false,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            };

            await this.collection.add(notification);
            return true;
        } catch (error) {
            console.error('[Notification] Failed to create security notification:', error);
            return false;
        }
    }

    // Additional methods like markRead or getNotifications can be handled here or in controller directly querying Firestore
}

module.exports = new NotificationService();
