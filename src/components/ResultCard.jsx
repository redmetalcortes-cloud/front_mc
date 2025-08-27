function ResultCard({ result }) {
  return (
    <div className="result-card">
      <h2>Resultados</h2>
      <p><b>Material:</b> {result.material}</p>
      <p><b>Cantidad:</b> {result.cantidad}</p>
      <p><b>Dimensiones:</b> {result.ancho.toFixed(0)} x {result.alto.toFixed(0)} mm</p>
      <p><b>Perímetro total:</b> {result.total_perimeter.toFixed(0)} mm</p>
      <p><b>Costo bruto:</b> {result.costo_bruto.toFixed(0)} COP</p>
      <p><b>Precio unitario sin descuento:</b> {result.precio_unitario_sin_descuento.toFixed(0)} COP</p>
      <p><b>Precio unitario con descuento:</b> {result.precio_unitario_con_descuento.toFixed(0)} COP</p>
      <p><b>Precio final:</b> {result.precio_final.toFixed(0)} COP</p>

      {result.preview_png_url && (
        <div>
          <h3>Preview</h3>
          <img
            src={`http://localhost:8000${result.preview_png_url}`}
            alt="Preview DXF"
            style={{ maxWidth: "400px", border: "1px solid #ccc" }}
          />
        </div>
      )}

      {result.pdf_url && (
        <a
          href={`http://localhost:8000${result.pdf_url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          📄 Descargar PDF
        </a>
      )}
    </div>
  );
}

export default ResultCard;
