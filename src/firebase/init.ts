import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";
import { getPerformance } from "firebase/performance";
import { getAnalytics, isSupported } from "firebase/analytics"; // 👈 add this

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase Application
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Services
const auth = getAuth(firebaseApp);
const firestoreDb = initializeFirestore(firebaseApp, {
  experimentalAutoDetectLongPolling: true,
});
const storage = getStorage(firebaseApp);

// Initialize Firebase Performance
const perf = getPerformance(firebaseApp);

// Initialize Firebase Analytics (conditionally, since not all environments support it)
let analytics = null;
if (firebaseConfig.measurementId) {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(firebaseApp);
    }
  });
}

export { auth, firestoreDb, storage, perf, analytics };