const { admin, db } = require('../config/firebase');
const notificationService = require('./notification.service');
const auditService = require('./audit.service');

const ABUSE_THRESHOLD = 50; // Example threshold

class AbuseService {
    constructor() {
        this.db = db;
        this.collection = this.db.collection('abuse_scores');
    }

    /**
     * Get or create abuse score record for a user
     * @param {string} userId 
     */
    async getScore(userId) {
        const docRef = this.collection.doc(userId);
        const doc = await docRef.get();

        if (!doc.exists) {
            return { userId, score: 0, flagged: false };
        }
        return doc.data();
    }

    /**
     * Check if user should be flagged and perform flagging if so.
     * @param {string} userId 
     */
    async checkAndFlag(userId) {
        const record = await this.getScore(userId);

        if (!record.flagged && record.score >= ABUSE_THRESHOLD) {
            // Flag the user
            await this.collection.doc(userId).set({ flagged: true }, { merge: true });

            // Notify admins - (In a real system, possibly email or specialized admin notification view)
            // For now, we log system audit
            await auditService.logAction('SYSTEM', 'SYSTEM', 'AUTO_FLAG_USER', 'USER', userId, { score: record.score });

            return { flagged: true, score: record.score };
        }

        return { flagged: record.flagged, score: record.score };
    }

    /**
     * Report an action that contributes to abuse score.
     * @param {string} userId 
     * @param {number} points 
     * @param {string} reason 
     */
    async reportAction(userId, points, reason) {
        const docRef = this.collection.doc(userId);

        try {
            await this.db.runTransaction(async (t) => {
                const doc = await t.get(docRef);
                const currentData = doc.exists ? doc.data() : { score: 0, flagged: false };

                const newScore = (currentData.score || 0) + points;

                t.set(docRef, {
                    userId,
                    score: newScore,
                    lastUpdated: admin.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
            });

            // Post-update check
            await this.checkAndFlag(userId);
            return true;
        } catch (error) {
            console.error('Abuse report error:', error);
            return false;
        }
    }
}

module.exports = new AbuseService();
