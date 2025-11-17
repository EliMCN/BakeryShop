import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContex/useAuthContext";
import "./AdminNav.css";

export const AdminNav = () => {
  const { user, logout } = useAuthContext();

  return (
    <nav className="admin-nav"> 
      <div className="admin-nav-links">
        <Link to="/admin">Productos</Link>
        <Link to="/admin/alta-productos">Alta de Productos</Link>
      </div>
      <div className="admin-nav-user">
        {user && <span>Hola, {user.name}</span>}
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
};