import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Dashboard/Home";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import MyFigures from "./pages/Dashboard/MyFigures";
import Quotes from "./pages/Dashboard/Quotes";
import UsersAdmin from "./pages/Admin/UsersAdmin";
import MaterialsAdmin from "./pages/Admin/MaterialsAdmin";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import { AuthProvider } from "./store/authContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="container mt-4">
          <Routes>
            {/* Públicas */}
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Dashboard público */}
            <Route path="/" element={<Home />} />

            {/* Privadas (requiere sesión) */}
            <Route element={<PrivateRoutes />}>
              <Route path="/my-figures" element={<MyFigures />} />
              <Route path="/quotes" element={<Quotes />} />
              <Route path="/admin/users" element={<UsersAdmin />} />
              <Route path="/admin/materials" element={<MaterialsAdmin />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
