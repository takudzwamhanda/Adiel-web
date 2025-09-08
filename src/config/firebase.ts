import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAKmD7jy4kBmDsISV1XQd4WzDUC02ajI7o',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'adiel-beauty.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'adiel-beauty',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'adiel-beauty.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '956008559897',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:956008559897:web:ee2f6e2b88eeec76e08188'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
