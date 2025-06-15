// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQGEJEtStNbCyzXlJGZx7IZAc8ZAJMcKo",
  authDomain: "star-wars-8901a.firebaseapp.com",
  projectId: "star-wars-8901a",
  storageBucket: "star-wars-8901a.firebasestorage.app",
  messagingSenderId: "464161975758",
  appId: "1:464161975758:web:8fe6722003327d4ab60f9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export { app, auth };