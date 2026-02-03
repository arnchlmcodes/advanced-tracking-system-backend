const admin = require('../config/firebase');
const db = admin.firestore();

class ClaimsService {
    /**
     * Create a new claim
     * @param {string} itemId 
     * @param {string} claimantUid 
     * @returns {Promise<Object>}
     */
    async createClaim(itemId, claimantUid) {
        // Prevent duplicate claims per item per user
        // We check if there is an existing claim for this item by this user that is NOT rejected?
        // Prompt says "Prevent duplicate claims per item per user". 
        // Usually implies any active claim. But maybe even history?
        // I will check for 'pending' or 'approved' status. If rejected, maybe they can claim again?
        // Let's stick to strict "duplicate" -> if one exists with same itemId and claimantUid, block it?
        // "Status defaults to pending".
        // Let's assume we block if there's a pending or approved claim. Rejected ones might allow retry.
        // Actually, prompt just says "Prevent duplicate claims per item per user".
        // I'll check for any claim with same itemId and claimantUid that is NOT rejected.

        const existingClaims = await db.collection('claims')
            .where('itemId', '==', itemId)
            .where('claimantUid', '==', claimantUid)
            .where('status', 'in', ['pending', 'approved'])
            .get();

        if (!existingClaims.empty) {
            throw new Error('Duplicate claim: You have already claimed this item.');
        }

        const newClaim = {
            itemId,
            claimantUid,
            status: 'pending',
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('claims').add(newClaim);
        return { id: docRef.id, ...newClaim };
    }

    /**
     * Get claims for a specific user
     * @param {string} uid 
     * @returns {Promise<Array>}
     */
    async getMyClaims(uid) {
        const snapshot = await db.collection('claims')
            .where('claimantUid', '==', uid)
            .orderBy('createdAt', 'desc') // Good practice to order
            .get();

        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    /**
     * Get all pending claims (Admin)
     * @returns {Promise<Array>}
     */
    async getPendingClaims() {
        const snapshot = await db.collection('claims')
            .where('status', '==', 'pending')
            .orderBy('createdAt', 'asc') // Oldest first for admin queue
            .get();

        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    /**
     * Approve a claim
     * @param {string} claimId 
     * @returns {Promise<Object>}
     */
    async approveClaim(claimId) {
        return await db.runTransaction(async (transaction) => {
            const claimRef = db.collection('claims').doc(claimId);
            const claimDoc = await transaction.get(claimRef);

            if (!claimDoc.exists) {
                throw new Error('Claim not found');
            }

            const claimData = claimDoc.data();
            if (claimData.status !== 'pending') {
                throw new Error('Claim is not pending');
            }

            const itemRef = db.collection('items').doc(claimData.itemId);
            // We assume item exists as per prompt flow, but good to check in real world.
            // For this task, we proceed to update.

            transaction.update(claimRef, { status: 'approved' });
            transaction.update(itemRef, { status: 'returned' });

            return { id: claimId, status: 'approved' };
        });
    }

    /**
     * Reject a claim
     * @param {string} claimId 
     * @returns {Promise<Object>}
     */
    async rejectClaim(claimId) {
        const claimRef = db.collection('claims').doc(claimId);

        // Simple update
        await claimRef.update({ status: 'rejected' });
        return { id: claimId, status: 'rejected' };
    }
}

module.exports = new ClaimsService();
