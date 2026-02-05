const { db, admin } = require('../config/firebase');

class CommunicationService {
    /**
     * Send a message (Chat)
     * @param {string} claimId 
     * @param {string} senderUid 
     * @param {string} content 
     * @param {boolean} isProofRequest 
     */
    async sendMessage(claimId, senderUid, content, isProofRequest = false) {
        // Verify claim exists
        const claimDoc = await db.collection('claims').doc(claimId).get();
        if (!claimDoc.exists) throw new Error('Claim not found');

        const message = {
            claimId,
            senderUid,
            content,
            isProofRequest,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        };

        await db.collection('messages').add(message);
        return message;
    }

    /**
     * Get message history for a claim
     * @param {string} claimId 
     */
    async getMessages(claimId) {
        const snapshot = await db.collection('messages')
            .where('claimId', '==', claimId)
            .orderBy('timestamp', 'asc')
            .get();

        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    /**
     * Request proof from claimant
     * @param {string} claimId 
     * @param {string} adminUid 
     */
    async requestProof(claimId, adminUid) {
        return this.sendMessage(claimId, adminUid, "Please upload additional proof of ownership.", true);
    }
}

module.exports = new CommunicationService();
