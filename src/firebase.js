// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBdaEraQwBUZerL3jnp5YgnKMZG-AchhKQ",
  authDomain: "red-mc.firebaseapp.com",
  projectId: "red-mc",
  storageBucket: "red-mc.appspot.com",
  messagingSenderId: "1063562716926",
  appId: "1:1063562716926:web:913cfb4ad273f89bdc27af",
  measurementId: "G-FYVMVTBW6E"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
