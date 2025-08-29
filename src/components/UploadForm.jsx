import { useState } from "react";
import axios from "axios";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./UploadForm.css";

const API_URL = "https://back-mc.onrender.com/files/upload/";

function UploadForm({ setResult }) {
  const [file, setFile] = useState(null);
  const [material, setMaterial] = useState("CR18");
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Selecciona un archivo DXF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("material", material);
    formData.append("cantidad", cantidad);

    try {
      setLoading(true);
      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data);

      if (auth.currentUser) {
        await addDoc(collection(db, "ordenes"), {
          uid: auth.currentUser.uid,
          material,
          cantidad: Number(cantidad),
          precio_final: Number(res.data.precio_final),
          costo_bruto: Number(res.data.costo_bruto),
          ancho: Number(res.data.ancho),
          alto: Number(res.data.alto),
          createdAt: new Date(),
        });
      }
    } catch (error) {
      console.error(error);
      alert("Error al procesar el archivo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="upload-form card shadow p-4" onSubmit={handleSubmit}>
      <h4 className="mb-3">Nueva Cotización</h4>
      <div className="mb-3">
        <label className="form-label">Archivo DXF</label>
<input 
  type="file" 
  className="form-control" 
  onChange={(e) => setFile(e.target.files[0])} 
/>
      </div>
      <div className="mb-3">
        <label className="form-label">Material</label>
        <select className="form-select" value={material} onChange={(e) => setMaterial(e.target.value)}>
          <option value="CR18">CR18</option>
          <option value="CR16">CR16</option>
          <option value="HR14">HR14</option>
          <option value="INOX18">INOX18</option>
          <option value="ALUM3">ALUM3</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Cantidad</label>
        <input type="number" className="form-control" min="1" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Procesando..." : "Subir y Procesar"}
      </button>
    </form>
  );
}

export default UploadForm;
