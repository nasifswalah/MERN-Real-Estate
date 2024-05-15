// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-mern-672a2.firebaseapp.com",
  projectId: "real-estate-mern-672a2",
  storageBucket: "real-estate-mern-672a2.appspot.com",
  messagingSenderId: "12886280717",
  appId: "1:12886280717:web:db2d8e7ead8bb4c415e344"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);