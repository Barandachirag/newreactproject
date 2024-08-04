// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCtvoNSnuqdiCgwpcvpEcUISeggDC7X8P0",
  authDomain: "newreactproject-3a3b1.firebaseapp.com",
  projectId: "newreactproject-3a3b1",
  storageBucket: "newreactproject-3a3b1.appspot.com",
  messagingSenderId: "515563064335",
  appId: "1:515563064335:web:8b1a4fbb1c7649aa22677a",
  measurementId: "G-5P28X7HVKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth };

