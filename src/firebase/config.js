// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC5UZBfJPizX1cm__vAYJiHZrFY7c0JQg",
  authDomain: "intercambio-herramientas.firebaseapp.com",
  projectId: "intercambio-herramientas",
  storageBucket: "intercambio-herramientas.firebasestorage.app",
  messagingSenderId: "193742025060",
  appId: "1:193742025060:web:2f29880b97ff90b8c24a71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };