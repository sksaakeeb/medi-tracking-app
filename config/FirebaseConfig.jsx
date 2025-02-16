// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1d9Og8uLnzvcDnRqAmm0e1wIpMBBoU80",
  authDomain: "my-projects-bc54e.firebaseapp.com",
  projectId: "my-projects-bc54e",
  storageBucket: "my-projects-bc54e.firebasestorage.app",
  messagingSenderId: "846361561141",
  appId: "1:846361561141:web:e1d4fab245e4ebd4b4497c",
  measurementId: "G-X9ZK6ZJXEL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);