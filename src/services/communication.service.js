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
        if (!content || !content.trim()) throw new Error('Message content cannot be empty');

        // Verify claim exists
        const claimDoc = await db.collection('claims').doc(claimId).get();
        if (!claimDoc.exists) throw new Error('Claim not found');

        const message = {
            claimId,
            senderUid,
            content: content.trim(),
            isProofRequest,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('messages').add(message);

        return {
            id: docRef.id,
            ...message,
            senderId: senderUid, // Add senderId for frontend interface compatibility
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Get message history for a claim
     * @param {string} claimId 
     */
    async getMessages(claimId) {
        try {
            const snapshot = await db.collection('messages')
                .where('claimId', '==', claimId)
                .get();

            const messages = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    // Ensure serializable data if needed, though getMessages is usually read-only
                };
            });

            // Manual sort to avoid index requirement for where + orderBy
            return messages.sort((a, b) => {
                const timeA = a.timestamp?.toMillis ? a.timestamp.toMillis() : new Date(a.timestamp).getTime();
                const timeB = b.timestamp?.toMillis ? b.timestamp.toMillis() : new Date(b.timestamp).getTime();
                return timeA - timeB;
            });
        } catch (error) {
            console.error('getMessages error:', error);
            throw error;
        }
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
