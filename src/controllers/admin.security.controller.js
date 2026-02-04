const { success, error } = require('../utils/response');
const { admin, db } = require('../config/firebase');
const auditService = require('../services/audit.service');
const notificationService = require('../services/notification.service');
// const db = admin.firestore(); // db is already imported

class AdminSecurityController {

    /**
     * Get security overview/dashboard stats
     */
    async getOverview(req, res) {
        try {
            // In real app, these might need aggregation queries or counters
            const flaggedUsersCount = (await db.collection('abuse_scores').where('flagged', '==', true).get()).size;

            // Recent enforcement actions
            const recentActionsSnap = await db.collection('audit_logs')
                .where('actionType', 'in', ['SUSPEND_USER', 'BLOCK_USER', 'UNSUSPEND_USER'])
                .orderBy('timestamp', 'desc')
                .limit(10)
                .get();

            const recentActions = [];
            recentActionsSnap.forEach(doc => recentActions.push(doc.data()));

            return success(res, {
                flaggedUsersCount,
                recentActions
            });
        } catch (err) {
            console.error('Admin getOverview error:', err);
            return error(res, 'Failed to fetch overview', 500);
        }
    }

    /**
     * Enforce security action (Suspend/Block)
     * POST /admin/security/enforce
     * Body: { targetUserId, action: 'SUSPEND'|'BLOCK'|'UNSUSPEND', reason }
     */
    async enforceAction(req, res) {
        try {
            const { targetUserId, action, reason } = req.body;
            const adminId = req.user.uid;

            if (!targetUserId || !action || !reason) {
                return error(res, 'Missing required fields', 400);
            }

            // Map action to status
            let newStatus;
            if (action === 'SUSPEND') newStatus = 'suspended';
            else if (action === 'BLOCK') newStatus = 'blocked';
            else if (action === 'UNSUSPEND') newStatus = 'active';
            else return error(res, 'Invalid action', 400);

            // Update user document
            await db.collection('users').doc(targetUserId).update({
                status: newStatus,
                lastMorederatedAt: admin.firestore.FieldValue.serverTimestamp(),
                moderationReason: reason
            });

            // Log Audit
            await auditService.logAction(
                adminId, 'admin', `${action}_USER`, 'USER', targetUserId, { reason }
            );

            // Notify User
            await notificationService.createSecurityNotification(
                targetUserId,
                'CRITICAL',
                `Your account has been updated to: ${newStatus}. Reason: ${reason}`
            );

            return success(res, { message: `User ${action} successful` });

        } catch (err) {
            console.error('enforceAction error:', err);
            return error(res, 'Enforcement failed', 500);
        }
    }

    /**
     * Get Audit Logs with basic filtering
     * GET /admin/security/audit-logs?userId=...&type=...
     */
    async getAuditLogs(req, res) {
        try {
            const { userId, type, limit = 50 } = req.query;
            let query = db.collection('audit_logs').orderBy('timestamp', 'desc');

            if (userId) query = query.where('actorId', '==', userId);
            if (type) query = query.where('actionType', '==', type);

            const snapshot = await query.limit(parseInt(limit)).get();

            const logs = [];
            snapshot.forEach(doc => logs.push({ id: doc.id, ...doc.data() }));

            return success(res, logs);

        } catch (err) {
            console.error('getAuditLogs error:', err);
            return error(res, 'Failed to fetch audit logs', 500);
        }
    }
}

module.exports = new AdminSecurityController();
