import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function LoginPage() {
  const { login, loginGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
    } catch (error) {
      setErr(error.message);
    }
  }

  async function onGoogle() {
    setErr("");
    try {
      await loginGoogle();
    } catch (error) {
      setErr(error.message);
    }
  }

  return (
    <div className="card p-4 shadow mx-auto" style={{ maxWidth: 420 }}>
      <h2 className="mb-3">Iniciar sesión</h2>
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-100 mb-2">Ingresar</button>
      </form>
      <button className="btn btn-outline-danger w-100" onClick={onGoogle}>
        Continuar con Google
      </button>
    </div>
  );
}
