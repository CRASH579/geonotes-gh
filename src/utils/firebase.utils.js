import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { GeoFirestore } from 'geofirestore';
import { 
  getAuth, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence
} from 'firebase/auth';

// Validate environment variables
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);

if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars);
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}

// Log environment variables for debugging (remove in production)
console.log('Environment variables available:', Object.keys(import.meta.env));
console.log('Firebase Config:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'Present' : 'Missing',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? 'Present' : 'Missing',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'Present' : 'Missing',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? 'Present' : 'Missing',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? 'Present' : 'Missing',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ? 'Present' : 'Missing'
});

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase only if it hasn't been initialized
let app;
try {
  console.log('Attempting to initialize Firebase...');
  if (!firebaseConfig.apiKey) {
    throw new Error('Firebase API key is missing');
  }
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
  if (!/already exists/.test(error.message)) {
    console.error('Firebase initialization error stack:', error.stack);
    throw error; // Re-throw the error to prevent the app from running with invalid Firebase config
  }
}

const auth = getAuth(app);
const db = getFirestore(app);
const geoFirestore = new GeoFirestore(db);
const googleProvider = new GoogleAuthProvider();

// Add scopes if you need additional access
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// Set custom parameters
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

// Configure persistence for GitHub Pages
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

// Add error handling for Firebase operations
const handleFirebaseError = (error) => {
  console.error('Firebase operation error:', error);
  if (error.code === 'auth/network-request-failed') {
    console.error('Network request failed. Please check your connection and try again.');
  }
};

export { 
  auth, 
  db, 
  googleProvider, 
  geoFirestore,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut,
  handleFirebaseError
};


