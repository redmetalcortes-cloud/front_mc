import { useState } from "react";
import UploadForm from "./components/Uploadform";
import ResultCard from "./components/ResultCard";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="container">
      <h1>EAZY DXF Processor</h1>
      <UploadForm setResult={setResult} />
      {result && <ResultCard result={result} />}
    </div>
  );
}

export default App;
