import { useState } from "react";
import axios from "axios";

const API_URL = "https://back-mc.onrender.com/files/upload/"; 
// ⚠️ cambia esto al dominio de Render

function UploadForm({ setResult }) {
  const [file, setFile] = useState(null);
  const [material, setMaterial] = useState("CR18");
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Debes seleccionar un archivo DXF");
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
    } catch (error) {
      console.error(error);
      alert("Error al procesar el archivo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <div>
        <label>Archivo DXF:</label>
        <input type="file" accept=".dxf" onChange={(e) => setFile(e.target.files[0])} />
      </div>

      <div>
        <label>Material:</label>
        <select value={material} onChange={(e) => setMaterial(e.target.value)}>
          <option value="CR18">CR18</option>
          <option value="CR16">CR16</option>
          <option value="HR14">HR14</option>
          <option value="INOX18">INOX18</option>
          <option value="ALUM3">ALUM3</option>
          {/* agrega más según tu backend */}
        </select>
      </div>

      <div>
        <label>Cantidad:</label>
        <input
          type="number"
          min="1"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Procesando..." : "Subir y Procesar"}
      </button>
    </form>
  );
}

export default UploadForm;
