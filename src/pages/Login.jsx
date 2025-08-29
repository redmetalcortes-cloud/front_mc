import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      alert("❌ " + error.message);
    }
  };

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      alert("❌ " + error.message);
    }
  };

  return (
    <div className="login container py-5">
      <div className="card shadow p-4 mx-auto" style={{maxWidth: "400px"}}>
        <h3 className="mb-3 text-center">Login / Registro</h3>
        <input className="form-control mb-2" type="email" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} />
        <input className="form-control mb-3" type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary w-100 mb-2" onClick={login}>Login</button>
        <button className="btn btn-outline-secondary w-100" onClick={register}>Registrar</button>
      </div>
    </div>
  );
}

export default Login;
