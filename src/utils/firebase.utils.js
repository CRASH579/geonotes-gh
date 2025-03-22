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

// Log environment variables for debugging (remove in production)
console.log('Firebase Config:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
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
  app = initializeApp(firebaseConfig);
} catch (error) {
  if (!/already exists/.test(error.message)) {
    console.error('Firebase initialization error', error.stack);
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


