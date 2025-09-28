import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoutes() {
  const { token, loading } = useAuth();
  if (loading) return null; // puedes poner un loader
  return token ? <Navigate to="/" replace /> : <Outlet />;
}
