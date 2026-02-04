const admin = require('firebase-admin');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

/**
 * Validates and initializes Firebase Admin SDK
 * 
 * Strategy:
 * 1. Check for GOOGLE_APPLICATION_CREDENTIALS path in env (Best for local/docker)
 * 2. Fallback to default credentials (Best for cloud environments like GKE, Cloud Run)
 */
const initializeFirebase = () => {
    try {
        if (!admin.apps.length) {
            const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

            if (serviceAccountPath) {
                // Load from file path specified in .env
                // Ensure this path is absolute or relative to where the process runs
                const absolutePath = path.isAbsolute(serviceAccountPath)
                    ? serviceAccountPath
                    : path.resolve(process.cwd(), serviceAccountPath);

                console.log(`Initializing Firebase with credentials from: ${absolutePath}`);

                // We require the JSON file directly. 
                // Note: 'require' caches, but for config this is fine.
                // Using admin.credential.cert(require(...)) is standard.
                const serviceAccount = require(absolutePath);

                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount)
                });
            } else {
                // Fallback for production environments (e.g. Google Cloud) 
                // where credentials are auto-detected
                console.log('Initializing Firebase with default application credentials...');
                admin.initializeApp();
            }

            console.log('Firebase Admin Initialized Successfully');
        }
    } catch (error) {
        console.error('CRITICAL: Firebase Admin Initialization Failed');
        console.error(error.message);
        // We might want to exit here if DB is critical
        // process.exit(1); 
    }
};

initializeFirebase();

const db = admin.firestore();

module.exports = admin;
// Keeping default export for backward compatibility if any,
// but preferred usage is destructuring from this file if we exported db separately.
// However, the existing code likely uses the default export.
