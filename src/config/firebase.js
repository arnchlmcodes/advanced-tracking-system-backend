const admin = require("firebase-admin");
const dotenv = require("dotenv");
const path = require('path');

dotenv.config();

/**
 * Validates and initializes Firebase Admin SDK
 * Supports both individual environment variables (feature/unclaimed-sale)
 * and Service Account File / ADC (main/HEAD).
 */
if (!admin.apps.length) {
  const commonConfig = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
  };

  if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PROJECT_ID) {
    // Strategy 1: Explicit Env Vars
    console.log("Initializing Firebase with Environment Variables...");
    admin.initializeApp({
      ...commonConfig,
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // Strategy 2: Service Account File
    const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const absolutePath = path.isAbsolute(serviceAccountPath)
      ? serviceAccountPath
      : path.resolve(process.cwd(), serviceAccountPath);
    console.log(`Initializing Firebase with credentials from: ${absolutePath}`);
    try {
      const serviceAccount = require(absolutePath);
      admin.initializeApp({
        ...commonConfig,
        credential: admin.credential.cert(serviceAccount)
      });
    } catch (error) {
      console.error(`Failed to load service account: ${error.message}`);
      throw error;
    }
  } else {
    // Strategy 3: Default (ADC)
    console.log('Initializing Firebase with default application credentials...');
    admin.initializeApp(commonConfig);
  }
  console.log("✅ Firebase Admin Initialized");
}

// 🔁 Export commonly used services
const db = admin.firestore();
const auth = admin.auth();

module.exports = {
  admin,
  db,
  auth,
};
