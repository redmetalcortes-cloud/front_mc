import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cotizaciones from "./pages/Cotizaciones";
import Navbar from "./components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/cotizaciones" element={user ? <Cotizaciones /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
