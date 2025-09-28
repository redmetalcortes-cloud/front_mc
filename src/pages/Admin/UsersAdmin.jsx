import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { getAllUsers } from "../../api/userService";

export default function UsersAdmin() {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!isAdmin) {
      setErr("No autorizado. Requiere rol administrador.");
      return;
    }
    getAllUsers().then(setUsers).catch(e => setErr(e.message));
  }, [isAdmin]);

  if (err) return <div className="alert alert-danger">{err}</div>;

  return (
    <div>
      <h3>Administración de Usuarios</h3>
      <pre className="bg-light p-3 rounded">{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
