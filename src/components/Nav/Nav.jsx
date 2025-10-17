import { Link } from "react-router-dom";
import { CartWidget } from "../CartWidget/CartWidget";
import "./Nav.css";

export const Nav = () => {
  // Creo componenete CartWidget al final de la lista de navegación para mostrar el numerito
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/category/salado"}>Salado</Link>
        </li>
        <li>
          <Link to={"/category/dulce"}>Dulce</Link>
        </li>
        <li>
          <CartWidget />
        </li>
      </ul>
    </nav>
  );
};
