const admin = require('../config/firebase');

// Example service to interact with Firestore or Auth
class FirebaseService {
    /**
     * Get user by UID
     * @param {string} uid 
     * @returns {Promise<Object>}
     */
    async getUser(uid) {
        try {
            const userRecord = await admin.auth().getUser(uid);
            return userRecord;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Verify ID Token
     * @param {string} token 
     * @returns {Promise<Object>} decoded token
     */
    async verifyToken(token) {
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            return decodedToken;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new FirebaseService();
