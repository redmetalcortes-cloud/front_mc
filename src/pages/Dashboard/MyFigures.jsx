import { useEffect, useState } from "react";
import { listMyFigures } from "../../api/figureService";

export default function MyFigures() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    listMyFigures().then(setItems).catch(e => setErr(e.message));
  }, []);

  if (err) return <div className="alert alert-danger">{err}</div>;

  return (
    <div>
      <h3>Mis Figuras</h3>
      <pre className="bg-light p-3 rounded">{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
