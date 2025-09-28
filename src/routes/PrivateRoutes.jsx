import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoutes() {
  const { token, loading } = useAuth();
  if (loading) return null; // puedes poner un loader
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
