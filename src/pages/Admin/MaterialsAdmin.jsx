import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { listMaterials, createMaterial } from "../../api/materialService";

export default function MaterialsAdmin() {
  const { isAdmin } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [err, setErr] = useState("");

  async function refresh() {
    try {
      const data = await listMaterials();
      setMaterials(data || []);
    } catch (e) {
      setErr(e.message);
    }
  }

  useEffect(() => {
    if (!isAdmin) {
      setErr("No autorizado. Requiere rol administrador.");
      return;
    }
    refresh();
  }, [isAdmin]);

  async function onCreate(e) {
    e.preventDefault();
    setErr("");
    try {
      await createMaterial({ name, price: Number(price) });
      setName(""); setPrice("");
      refresh();
    } catch (e) {
      setErr(e.message);
    }
  }

  if (err) return <div className="alert alert-danger">{err}</div>;

  return (
    <div>
      <h3>Administración de Materiales</h3>
      <form className="row g-2 mb-3" onSubmit={onCreate}>
        <div className="col-md-5">
          <input className="form-control" placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div className="col-md-5">
          <input className="form-control" placeholder="Precio" type="number" value={price} onChange={e=>setPrice(e.target.value)} />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100">Crear</button>
        </div>
      </form>
      <pre className="bg-light p-3 rounded">{JSON.stringify(materials, null, 2)}</pre>
    </div>
  );
}
