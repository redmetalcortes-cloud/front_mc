import { API_URL } from "../config";
import { app } from "../lib/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/** Login clásico (email + pass) */
export async function loginEmailPassword(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Error al iniciar sesión");
  return data; // { token, user }
}

/** Login con Google: popup Firebase + canje de idToken con el backend */
export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  const idToken = await result.user.getIdToken();
  const res = await fetch(`${API_URL}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Error al autenticar con Google");
  return { ...data, firebaseUser: result.user }; // { token, user, firebaseUser }
}

export async function refreshToken(oldToken) {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${oldToken}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "No se pudo refrescar el token");
  return data; // { token }
}

export async function logoutFirebase() {
  try { await signOut(auth); } catch {}
}
