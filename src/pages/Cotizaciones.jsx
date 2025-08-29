import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import "./Cotizaciones.css";

function Cotizaciones() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.currentUser) return;
      const q = query(
  collection(db, "ordenes"),
  where("uid", "==", auth.currentUser.uid)
);
      const querySnapshot = await getDocs(q);
      setOrders(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchOrders();
  }, []);

  return (
    <div className="cotizaciones container py-5">
      <h2>Mis Cotizaciones</h2>
      {orders.length === 0 && <p>No tienes cotizaciones aún.</p>}
      <div className="row">
        {orders.map(order => (
          <div key={order.id} className="col-md-6">
            <div className="card shadow-sm mb-3">
              <div className="card-body">
                <h5 className="card-title">{order.material}</h5>
                <p><strong>Cantidad:</strong> {order.cantidad}</p>
                <p><strong>Precio Final:</strong> {order.precio_final.toLocaleString()} COP</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cotizaciones;
