const admin = require('../config/firebase');
const db = admin.firestore();

class AnalyticsService {
    /**
     * Get aggregate stats for claims
     */
    async getClaimStats() {
        // Note: Firestore aggregation queries are efficient but limited.
        // For simple stats, we can count documents.
        // In a real production app with many docs, consider using distributed counters or the count() aggregation.

        const claimsColl = db.collection('claims');

        const pendingCount = (await claimsColl.where('status', '==', 'pending').count().get()).data().count;
        const approvedCount = (await claimsColl.where('status', '==', 'approved').count().get()).data().count;
        const rejectedCount = (await claimsColl.where('status', '==', 'rejected').count().get()).data().count;

        // Example: items returned count (could be same as approved if 1:1)
        const returnedCount = approvedCount;

        return {
            pending: pendingCount,
            approved: approvedCount,
            rejected: rejectedCount,
            returned: returnedCount,
            total: pendingCount + approvedCount + rejectedCount
        };
    }
}

module.exports = new AnalyticsService();
