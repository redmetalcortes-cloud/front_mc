// Firebase core setup
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Puedes mover estos valores a .env si prefieres.
// Para web, Firebase expone estos valores en cliente por diseño.
const firebaseConfig = {
  apiKey: "AIzaSyBdaEraQwBUZerL3jnp5YgnKMZG-AchhKQ",
  authDomain: "red-mc.firebaseapp.com",
  projectId: "red-mc",
  storageBucket: "red-mc.firebasestorage.app",
  messagingSenderId: "1063562716926",
  appId: "1:1063562716926:web:913cfb4ad273f89bdc27af",
  measurementId: "G-FYVMVTBW6E",
};

export const app = initializeApp(firebaseConfig);

// Analytics solo si es soportado (evita errores en SSR/entornos sin gtag)
export let analytics = null;
isSupported().then((ok) => {
  if (ok) analytics = getAnalytics(app);
}).catch(() => {});

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
