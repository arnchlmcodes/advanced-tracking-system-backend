const { admin, db } = require('../config/firebase');

class AuditService {
    constructor() {
        this.collection = db.collection('audit_logs');
    }

    /**
     * Log a critical action immutably.
     * @param {string} actorId - UID of the user performing the action
     * @param {string} actorRole - Role of the actor (user/admin)
     * @param {string} actionType - Type of action (e.g., 'LOGIN', 'SUSPEND_USER', 'DELETE_ITEM')
     * @param {string} entityType - Type of entity affected (e.g., 'USER', 'ITEM', 'REPORT')
     * @param {string} entityId - ID of the entity
     * @param {Object} metadata - Additional details (optional)
     */
    async logAction(actorId, actorRole, actionType, entityType, entityId, metadata = {}) {
        try {
            const entry = {
                actorId,
                actorRole,
                actionType,
                entityType,
                entityId,
                metadata,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            };

            await this.collection.add(entry);
            // console.log(`[Audit] Logged ${actionType} on ${entityType} ${entityId} by ${actorId}`);
            return true;
        } catch (error) {
            console.error('[Audit] Failed to log action:', error);
            // We usually don't throw here to prevent blocking the main flow, assuming best-effort logging
            // But for high-security, you might want to throw. We will log error and proceed.
            return false;
        }
    }
}

module.exports = new AuditService();
