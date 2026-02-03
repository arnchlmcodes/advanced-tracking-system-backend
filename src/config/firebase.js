const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Firebase Admin SDK
// Ensure you have set the environment variables or place your serviceAccountKey.json in the config folder
try {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
            }),
        });
        console.log('Firebase Admin Initialized');
    }
} catch (error) {
    console.error('Firebase Admin Initialization Error:', error.message);
    // Initializing with default credentials as fallback if env vars are missing/incorrect 
    // or if running in an environment like Google Cloud Functions
    try {
        if (!admin.apps.length) {
            admin.initializeApp();
            console.log('Firebase Admin Initialized with default credentials');
        }
    } catch (err) {
        console.error('Failed to initialize Firebase Admin:', err);
    }
}

module.exports = admin;
