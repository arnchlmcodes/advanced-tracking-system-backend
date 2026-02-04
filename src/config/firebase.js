const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

try {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(
                require('../../campus-57557-firebase-adminsdk-fbsvc-b39ee43796.json')
            ),
        });
        console.log('Firebase Admin Initialized');
    }
} catch (error) {
    console.error('Firebase Admin Initialization Error:', error.message);
}

const db = admin.firestore();

module.exports = { admin, db };
