const { db } = require('../config/firebase');

/**
 * Service to handle user data operations in Firestore.
 */
class UserService {
    constructor() {
        this.collection = db.collection('users');
    }

    /**
     * Finds a user by their campus ID.
     * @param {string} campusId 
     * @returns {Promise<object|null>} User data or null if not found
     */
    async findByCampusId(campusId) {
        try {
            const querySnapshot = await this.collection.where('campusId', '==', campusId).limit(1).get();
            if (querySnapshot.empty) {
                return null;
            }
            const doc = querySnapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            console.error('Error finding user by campus ID:', error);
            throw new Error('Database error while finding user');
        }
    }

    /**
     * Gets a user by their Firestore document ID.
     * @param {string} userId 
     * @returns {Promise<object|null>} User data or null
     */
    async findById(userId) {
        try {
            const doc = await this.collection.doc(userId).get();
            if (!doc.exists) {
                return null;
            }
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            console.error('Error finding user by ID:', error);
            throw new Error('Database error while finding user');
        }
    }
}

module.exports = new UserService();
