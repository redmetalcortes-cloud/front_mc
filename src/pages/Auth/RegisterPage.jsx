import { useState } from "react";
import { registerUser } from "../../api/userService";

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", password: "", name: "", address: "", phone: "" });
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setOk(""); setErr("");
    try {
      await registerUser(form);
      setOk("Usuario creado. Ahora puedes iniciar sesión.");
    } catch (error) {
      setErr(error.message);
    }
  }

  return (
    <div className="card p-4 shadow mx-auto" style={{ maxWidth: 520 }}>
      <h2 className="mb-3">Crear cuenta</h2>
      {ok && <div className="alert alert-success">{ok}</div>}
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={onSubmit}>
        <div className="row g-2">
          <div className="col-md-6">
            <label>Email</label>
            <input className="form-control" name="email" type="email" onChange={onChange} required />
          </div>
          <div className="col-md-6">
            <label>Contraseña</label>
            <input className="form-control" name="password" type="password" onChange={onChange} required />
          </div>
          <div className="col-md-6">
            <label>Nombre</label>
            <input className="form-control" name="name" onChange={onChange} />
          </div>
          <div className="col-md-6">
            <label>Teléfono</label>
            <input className="form-control" name="phone" onChange={onChange} />
          </div>
          <div className="col-12">
            <label>Dirección</label>
            <input className="form-control" name="address" onChange={onChange} />
          </div>
        </div>
        <button className="btn btn-success w-100 mt-3">Registrar</button>
      </form>
    </div>
  );
}
