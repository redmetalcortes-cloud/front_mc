import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginEmailPassword, loginWithGoogle, logoutFirebase } from "../api/authService";

const AuthContext = createContext(null);

function readStored() {
  try {
    const raw = localStorage.getItem("mc_auth");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function writeStored(value) {
  if (!value) localStorage.removeItem("mc_auth");
  else localStorage.setItem("mc_auth", JSON.stringify(value));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = readStored();
    if (saved?.token) {
      setUser(saved.user || null);
      setToken(saved.token);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await loginEmailPassword(email, password);
    setUser(data.user);
    setToken(data.token);
    writeStored({ token: data.token, user: data.user });
    return data;
  };

  const loginGoogle = async () => {
    const data = await loginWithGoogle();
    setUser(data.user);
    setToken(data.token);
    writeStored({ token: data.token, user: data.user });
    return data;
  };

  const logout = async () => {
    await logoutFirebase();
    setUser(null);
    setToken(null);
    writeStored(null);
  };

  const value = useMemo(() => ({
    user,
    token,
    loading,
    isAdmin: !!user?.isAdmin,
    login,
    loginGoogle,
    logout,
  }), [user, token, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
