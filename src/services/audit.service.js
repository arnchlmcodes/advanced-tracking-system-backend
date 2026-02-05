<<<<<<< HEAD
const admin = require('../config/firebase');
const db = admin.firestore();

class AuditService {
    /**
     * Log an admin action
     * @param {string} adminUid 
     * @param {string} action 
     * @param {string} targetId 
     * @param {Object} details 
     */
    async logAction(adminUid, action, targetId, details = {}) {
        try {
            await db.collection('audit_logs').add({
                adminUid,
                action,     // e.g., 'APPROVE', 'REJECT', 'NOTE', 'REOPEN'
                targetId,   // e.g., claimId
                details,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            });
        } catch (error) {
            console.error('Failed to log audit action:', error);
            // We don't throw here to avoid failing the main transaction if logging fails, 
            // but in a strict system we might want to.
        }
    }

    /**
     * Get audit logs (optional, for dashboard)
     */
    async getLogs(limit = 100) {
        const snapshot = await db.collection('audit_logs')
            .orderBy('timestamp', 'desc')
            .limit(limit)
            .get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}

module.exports = new AuditService();
=======
import { db } from "../config/firebase.js";

export const logAudit = async ({
  action,
  performedBy,
  role,
  itemId,
  details = {}
}) => {
  await db.collection("audit_logs").add({
    action,
    performedBy,
    role,
    itemId,
    details,
    timestamp: Date.now(),
  });
};
>>>>>>> origin/feature/unclaimed-sale
