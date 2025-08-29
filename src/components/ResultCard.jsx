import "./ResultCard.css";

function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="result-card card shadow-sm mt-4">
      <div className="card-body">
        <h5 className="card-title">Resultado de Cotización</h5>

        <div className="row">
          <div className="col-md-6">
            <p><strong>Material:</strong> {result.material || "N/A"}</p>
            <p><strong>Cantidad:</strong> {result.cantidad || 1}</p>
            <p><strong>Dimensiones:</strong> {result.ancho} x {result.alto} mm</p>
            <p><strong>Perímetro:</strong> {result.total_perimeter} mm</p>
          </div>
          <div className="col-md-6">
            <p><strong>Costo Bruto:</strong> {result.costo_bruto.toLocaleString()} COP</p>
            <p><strong>Costo Material:</strong> {result.costo_material?.toLocaleString()} COP</p>
            <p><strong>Costo Corte:</strong> {result.costo_corte?.toLocaleString()} COP</p>
            <p><strong>Costo Doblez:</strong> {result.costo_doblez?.toLocaleString()} COP</p>
          </div>
        </div>

        <hr />

        <h6 className="mt-3">Precio Final</h6>
        <p className="fs-5 text-success fw-bold">
          {result.precio_final.toLocaleString()} COP
        </p>

        {/* Preview de la pieza */}
        {result.preview && (
          <div className="preview-container mt-3">
            <h6>Vista Previa</h6>
            <img
              src={`https://back-mc.onrender.com/static/${result.preview}`}
              alt="Preview DXF"
              className="img-fluid rounded shadow-sm"
            />
          </div>
        )}

        {/* Botón de PDF */}
        <a
          href={`https://back-mc.onrender.com/files/download_pdf/${result.preview.replace(".png", "")}`}
          className="btn btn-success mt-3"
          target="_blank"
          rel="noreferrer"
        >
          Descargar PDF
        </a>
      </div>
    </div>
  );
}

export default ResultCard;
