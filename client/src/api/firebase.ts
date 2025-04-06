// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOhJfHFQLp8SXy29sdaQmr0irf-VYYDnQ",
  authDomain: "careconnect-fb60d.firebaseapp.com",
  projectId: "careconnect-fb60d",
  storageBucket: "careconnect-fb60d.firebasestorage.app",
  messagingSenderId: "799768332014",
  appId: "1:799768332014:web:e4258cc9db1c082e7015ff",
  measurementId: "G-3GLPWV5F29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };