import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { GeoFirestore } from 'geofirestore';
import { 
  getAuth, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
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
    client_id: '510491987865-15vdtf9k9mj6h8n3qr0fvu5si2dsdahh.apps.googleusercontent.com',
    prompt: 'select_account'
});



export { 
  auth, 
  db, 
  googleProvider, 
  geoFirestore,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut 
};


