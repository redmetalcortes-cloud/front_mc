import UploadForm from "../components/UploadForm";
import ResultCard from "../components/ResultCard";
import { useState } from "react";
import "./LandingPage.css";

function LandingPage() {
  const [result, setResult] = useState(null);

  return (
    <div className="landing container text-center py-5">
      <h1 className="mb-3">Bienvenido a <span className="brand">EAZY DXF Processor</span></h1>
      <p className="lead mb-4">Genera cotizaciones rápidas subiendo tus archivos DXF</p>
      <UploadForm setResult={setResult} />
      {result && <ResultCard result={result} />}
    </div>
  );
}

export default LandingPage;
