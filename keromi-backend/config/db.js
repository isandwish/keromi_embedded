import admin from "firebase-admin";

import dotenv from "dotenv";
// Load ENV 
dotenv.config({ path: "./config/config.env" });

// Safety check
if (!process.env.FIREBASE_PRIVATE_KEY) {
  console.error("Missing FIREBASE_PRIVATE_KEY in environment variables");
}

// Build service account
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
};

// Initialize Firebase (avoid duplicate init)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_URL,
  });
}

// Export reusable modules
export const firebaseAdmin = admin;
export const realtimeDB = admin.database();
