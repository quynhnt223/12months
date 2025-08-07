// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtY1KleFrPkrRK_SIoXHBEgijv6S21BrY",
  authDomain: "dayscorev1.firebaseapp.com",
  projectId: "dayscorev1",
  storageBucket: "dayscorev1.firebasestorage.app",
  messagingSenderId: "285018344461",
  appId: "1:285018344461:web:b70139e64cde129baf5944",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Authentication
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
