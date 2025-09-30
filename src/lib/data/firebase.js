// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqVCdfvYLwD9WE4bJOcOzZEbRL2QEGTF8",
  authDomain: "project-12months.firebaseapp.com",
  projectId: "project-12months",
  storageBucket: "project-12months.firebasestorage.app",
  messagingSenderId: "184768465546",
  appId: "1:184768465546:web:35ecf9516176f81fb17b73",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const dbf = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentSingleTabManager()
  }),
});