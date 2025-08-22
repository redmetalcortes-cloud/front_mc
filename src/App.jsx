import { useMemo, useState, useEffect } from "react";
import "./App.css";

/** ====== Tablas de referencia (valores demo para Colombia) ====== */
const MATERIALES = {
  "Acero A36": { densidad: 7850, precioKg: 6500 },
  "Inox 304": { densidad: 8000, precioKg: 16500 },
  "Aluminio 5052": { densidad: 2700, precioKg: 14500 },
};

const ESPESORES = {
  "Acero A36": [0.9, 1.2, 1.5, 2, 3, 4, 6, 8],
  "Inox 304": [0.9, 1.2, 1.5, 2, 3, 4, 6],
  "Aluminio 5052": [1, 1.5, 2, 3, 4, 6],
};

const TIPOS_CORTE = {
  "Láser fibra": 4800,      // COP por metro base (1 mm)
  "Plasma CNC": 3200,
  "Cizalla/Punzonado": 2200,
};

const ACABADOS = {
  "Ninguno": 0,
  "Pintura electrostática": 0.18, // % sobre subtotal
  "Galvanizado en frío": 0.22,
};

const CARGO_MONTAJE = 20000; // COP
const MIN_CORTE = 15000;     // mínimo de corte por orden
const IVA = 0.19;

/** Factor por espesor para tarifa de corte (aprox). */
const factorEspesor = (mm) => {
  if (mm <= 1) return 1.0;
  if (mm <= 1.5) return 1.15;
  if (mm <= 2) return 1.3;
  if (mm <= 3) return 1.6;
  if (mm <= 4) return 1.9;
  if (mm <= 6) return 2.5;
  return 3.2;
};

const fmtCOP = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
    isFinite(n) ? n : 0
  );

export default function App() {
  // ====== Estado ======
  const [material, setMaterial] = useState("Acero A36");
  const [espesor, setEspesor] = useState(1.5); // mm
  const [tipoCorte, setTipoCorte] = useState("Láser fibra");
  const [rectangular, setRectangular] = useState(true);

  // Rectangular
  const [largo, setLargo] = useState(200); // mm
  const [ancho, setAncho] = useState(150); // mm

  // Formas libres (si NO es rectangular)
  const [areaLibre, setAreaLibre] = useState(0); // m2
  const [perimetroLibre, setPerimetroLibre] = useState(0); // m

  const [cantidad, setCantidad] = useState(1);
  const [acabado, setAcabado] = useState("Ninguno");
  const [urgente, setUrgente] = useState(false);
  const [conIVA, setConIVA] = useState(true);
  const [nota, setNota] = useState("Demo – precios ficticios para pruebas.");

  // Mantener espesor válido al cambiar material
  useEffect(() => {
    const lista = ESPESORES[material];
    if (!lista.includes(espesor)) setEspesor(lista[0]);
  }, [material]);

  // ====== Cálculos ======
  const calculos = useMemo(() => {
    const dens = MATERIALES[material].densidad;
    const precioKg = MATERIALES[material].precioKg;

    // Área y perímetro
    const area_m2 = rectangular
      ? (largo / 1000) * (ancho / 1000)
      : Math.max(0, Number(areaLibre));

    const perimetro_m = rectangular
      ? 2 * (largo + ancho) / 1000
      : Math.max(0, Number(perimetroLibre));

    // Volumen y peso (para UNA pieza)
    const volumen_m3 = area_m2 * (espesor / 1000); // m3
    const pesoKg_una = volumen_m3 * dens;          // kg
    const pesoKg_total = pesoKg_una * cantidad;

    // Costos
    const costoMaterial = pesoKg_total * precioKg;

    const tarifaBase = TIPOS_CORTE[tipoCorte];
    const tarifaCorte = tarifaBase * factorEspesor(espesor);
    const costoCorteTeorico = perimetro_m * tarifaCorte * cantidad;
    const costoCorte = Math.max(costoCorteTeorico, MIN_CORTE);

    const subtotalBase = costoMaterial + costoCorte + CARGO_MONTAJE;
    const costoAcabado = subtotalBase * (ACABADOS[acabado] || 0);
    const cargoUrgencia = urgente ? subtotalBase * 0.15 : 0;

    const subtotal = subtotalBase + costoAcabado + cargoUrgencia;
    const valorIVA = conIVA ? subtotal * IVA : 0;
    const total = subtotal + valorIVA;

    return {
      area_m2,
      perimetro_m,
      pesoKg_una,
      pesoKg_total,
      costoMaterial,
      tarifaCorte,
      costoCorte,
      costoAcabado,
      cargoUrgencia,
      subtotalBase,
      subtotal,
      valorIVA,
      total,
    };
  }, [
    material,
    espesor,
    tipoCorte,
    rectangular,
    largo,
    ancho,
    areaLibre,
    perimetroLibre,
    cantidad,
    acabado,
    urgente,
    conIVA,
  ]);

  // ====== Utilidades ======
  const limpiar = () => {
    setMaterial("Acero A36");
    setEspesor(1.5);
    setTipoCorte("Láser fibra");
    setRectangular(true);
    setLargo(200);
    setAncho(150);
    setAreaLibre(0);
    setPerimetroLibre(0);
    setCantidad(1);
    setAcabado("Ninguno");
    setUrgente(false);
    setConIVA(true);
    setNota("Demo – precios ficticios para pruebas.");
  };

  const descargarJSON = () => {
    const data = {
      fecha: new Date().toISOString(),
      empresa: "MetalCortes",
      entrada: {
        material,
        espesor_mm: espesor,
        tipoCorte,
        rectangular,
        largo_mm: largo,
        ancho_mm: ancho,
        area_m2: calculos.area_m2,
        perimetro_m: calculos.perimetro_m,
        cantidad,
        acabado,
        urgente,
        conIVA,
        nota,
      },
      resultado: calculos,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cotizacion_metalcortes_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const listaEspesores = ESPESORES[material];

  // ====== UI ======
  return (
    <div className="mc-app">
      <header className="mc-header">
        <div className="mc-brand">
          <span className="mc-logo">MC</span>
          <div>
            <h1>MetalCortes</h1>
            <small>Cotizador rápido (Vite + React)</small>
          </div>
        </div>
        <div className="mc-badges">
          <span className="pill">COP • Colombia</span>
          <span className="pill">IVA {Math.round(IVA * 100)}%</span>
          <span className="pill pill-demo">Demo</span>
        </div>
      </header>

      <main className="mc-grid">
        {/* ====== FORM ====== */}
        <section className="mc-card">
          <h2>Parámetros de la pieza</h2>

          <div className="mc-field">
            <label>Material</label>
            <select value={material} onChange={(e) => setMaterial(e.target.value)}>
              {Object.keys(MATERIALES).map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="mc-row">
            <div className="mc-field">
              <label>Espesor (mm)</label>
              <select value={espesor} onChange={(e) => setEspesor(parseFloat(e.target.value))}>
                {listaEspesores.map((mm) => (
                  <option key={mm} value={mm}>{mm}</option>
                ))}
              </select>
            </div>

            <div className="mc-field">
              <label>Tipo de corte</label>
              <select value={tipoCorte} onChange={(e) => setTipoCorte(e.target.value)}>
                {Object.keys(TIPOS_CORTE).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="mc-field">
              <label>Cantidad</label>
              <input
                type="number"
                min={1}
                value={cantidad}
                onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value || "1", 10)))}
              />
            </div>
          </div>

          <div className="mc-switch">
            <input
              id="rect"
              type="checkbox"
              checked={rectangular}
              onChange={() => setRectangular((v) => !v)}
            />
            <label htmlFor="rect">La pieza es rectangular</label>
          </div>

          {rectangular ? (
            <div className="mc-row">
              <div className="mc-field">
                <label>Largo (mm)</label>
                <input
                  type="number"
                  min={1}
                  value={largo}
                  onChange={(e) => setLargo(Math.max(1, parseFloat(e.target.value || "0")))}
                />
              </div>
              <div className="mc-field">
                <label>Ancho (mm)</label>
                <input
                  type="number"
                  min={1}
                  value={ancho}
                  onChange={(e) => setAncho(Math.max(1, parseFloat(e.target.value || "0")))}
                />
              </div>
            </div>
          ) : (
            <div className="mc-row">
              <div className="mc-field">
                <label>Área (m²)</label>
                <input
                  type="number"
                  min={0}
                  step="0.001"
                  value={areaLibre}
                  onChange={(e) => setAreaLibre(parseFloat(e.target.value || "0"))}
                />
              </div>
              <div className="mc-field">
                <label>Perímetro (m)</label>
                <input
                  type="number"
                  min={0}
                  step="0.001"
                  value={perimetroLibre}
                  onChange={(e) => setPerimetroLibre(parseFloat(e.target.value || "0"))}
                />
              </div>
            </div>
          )}

          <div className="mc-row">
            <div className="mc-field">
              <label>Acabado</label>
              <select value={acabado} onChange={(e) => setAcabado(e.target.value)}>
                {Object.keys(ACABADOS).map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="mc-field mc-checks">
              <label className="mc-inline">
                <input type="checkbox" checked={urgente} onChange={() => setUrgente(v => !v)} />
                Urgente (+15%)
              </label>
              <label className="mc-inline">
                <input type="checkbox" checked={conIVA} onChange={() => setConIVA(v => !v)} />
                Mostrar con IVA
              </label>
            </div>
          </div>

          <div className="mc-field">
            <label>Notas</label>
            <textarea value={nota} onChange={(e) => setNota(e.target.value)} rows={2} />
          </div>

          <div className="mc-actions">
            <button className="btn btn-outline" onClick={limpiar}>Limpiar</button>
            <button className="btn btn-ghost" onClick={() => window.print()}>Imprimir</button>
            <button className="btn" onClick={descargarJSON}>Guardar cotización (JSON)</button>
          </div>
        </section>

        {/* ====== RESUMEN ====== */}
        <aside className="mc-card mc-summary">
          <h2>Resumen</h2>

          <div className="mc-kpis">
            <div className="kpi">
              <span className="kpi-title">Peso total</span>
              <strong>{calculos.pesoKg_total.toFixed(2)} kg</strong>
              <small>{(calculos.pesoKg_una).toFixed(3)} kg/pieza</small>
            </div>
            <div className="kpi">
              <span className="kpi-title">Área</span>
              <strong>{calculos.area_m2.toFixed(4)} m²</strong>
              <small>Perímetro {calculos.perimetro_m.toFixed(3)} m</small>
            </div>
            <div className="kpi">
              <span className="kpi-title">Tarifa corte</span>
              <strong>{fmtCOP(calculos.tarifaCorte)} / m</strong>
              <small>{tipoCorte} · esp. {espesor} mm</small>
            </div>
          </div>

          <div className="mc-table">
            <div><span>Material</span><span>{fmtCOP(calculos.costoMaterial)}</span></div>
            <div><span>Corte</span><span>{fmtCOP(calculos.costoCorte)}</span></div>
            <div><span>Cargo de montaje</span><span>{fmtCOP(CARGO_MONTAJE)}</span></div>
            <div><span>Acabado ({acabado})</span><span>{fmtCOP(calculos.costoAcabado)}</span></div>
            {urgente && <div><span>Urgencia</span><span>{fmtCOP(calculos.cargoUrgencia)}</span></div>}
            <div className="sep"></div>
            <div><strong>Subtotal</strong><strong>{fmtCOP(calculos.subtotal)}</strong></div>
            {conIVA && <div><span>IVA 19%</span><span>{fmtCOP(calculos.valorIVA)}</span></div>}
            <div className="total"><strong>Total</strong><strong>{fmtCOP(calculos.total)}</strong></div>
          </div>

          <div className="mc-hint">
            <p>
              * Valores de ejemplo. Ajusta <code>MATERIALS</code>, <code>TIPOS_CORTE</code>,
              <code> ACABADOS</code>, mínimos y factores según tu tarifario real.
            </p>
          </div>
        </aside>
      </main>

      <footer className="mc-footer">
        <small>© {new Date().getFullYear()} MetalCortes · Hecho con Vite + React</small>
      </footer>
    </div>
  );
}
