const { db } = require('../config/firebase');

/**
 * Service to handle OTP operations.
 * Stores OTPs in a 'otps' collection in Firestore.
 */
class OtpService {
    constructor() {
        this.collection = db.collection('otps');
    }

    /**
     * Saves an OTP for a user.
     * @param {string} userId 
     * @param {string} otp 
     * @param {number} expiryMinutes 
     */
    async saveOtp(userId, otp, expiryMinutes = 5) {
        try {
            const expiresAt = new Date();
            expiresAt.setMinutes(expiresAt.getMinutes() + expiryMinutes);

            // Use set with merge: true or just set to overwrite previous OTPs for this user
            // Using userId as doc ID to ensure one active OTP per user conceptually (or easy lookup)
            await this.collection.doc(userId).set({
                otp,
                userId,
                expiresAt,
                createdAt: new Date()
            });
        } catch (error) {
            console.error('Error saving OTP:', error);
            throw new Error('Database error while saving OTP');
        }
    }

    /**
     * Verifies an OTP for a user.
     * @param {string} userId 
     * @param {string} otp 
     * @returns {Promise<boolean>} True if valid, false otherwise
     */
    async verifyOtp(userId, otp) {
        try {
            const doc = await this.collection.doc(userId).get();
            if (!doc.exists) {
                return false;
            }

            const data = doc.data();
            const now = new Date(); // Firestore timestamps might need conversion, but JS Date comparison works if stored as Date or Timestamp converted to Date

            // Check if expired
            // Firestore data.expiresAt might be a Timestamp object
            let expiresAt = data.expiresAt;
            if (expiresAt && typeof expiresAt.toDate === 'function') {
                expiresAt = expiresAt.toDate();
            }

            if (now > expiresAt) {
                return false; // Expired
            }

            if (data.otp !== otp) {
                return false; // Wrong OTP
            }

            // Optional: Delete OTP after successful verification to prevent reuse
            await this.collection.doc(userId).delete();

            return true;
        } catch (error) {
            console.error('Error verifying OTP:', error);
            return false;
        }
    }
}

module.exports = new OtpService();
