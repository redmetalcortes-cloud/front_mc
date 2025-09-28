import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Navbar() {
  const { token, user, logout, isAdmin } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Metalcortes</Link>
        <div className="d-flex gap-2">
          {token ? (
            <>
              <Link className="btn btn-outline-light" to="/my-figures">Mis Figuras</Link>
              <Link className="btn btn-outline-light" to="/quotes">Cotizaciones</Link>
              {isAdmin && (
                <>
                  <Link className="btn btn-warning" to="/admin/users">Usuarios</Link>
                  <Link className="btn btn-warning" to="/admin/materials">Materiales</Link>
                </>
              )}
              <button className="btn btn-danger" onClick={logout}>
                Salir {user?.name ? `(${user.name})` : ""}
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light" to="/login">Login</Link>
              <Link className="btn btn-outline-light" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
