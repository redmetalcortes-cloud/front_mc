import { Link } from "react-router-dom";
import { auth } from "../firebase";
import "./Navbar.css";

function Navbar({ user }) {
  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">EAZY DXF</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
            {user && <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>}
            {user && <li className="nav-item"><Link className="nav-link" to="/cotizaciones">Cotizaciones</Link></li>}
            {!user 
              ? <li className="nav-item"><Link className="btn btn-light ms-2" to="/login">Login</Link></li>
              : <li className="nav-item"><button className="btn btn-danger ms-2" onClick={handleLogout}>Salir</button></li>}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
