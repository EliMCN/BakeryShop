import { Link } from "react-router-dom";
import { CartWidget } from "../CartWidget/CartWidget";
import "./Nav.css";

export const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>         
          <Link to={"/productos"}>Nuestros Productos</Link>
        </li>
        <li>
          <CartWidget />
        </li>
        {/* El botón de Login es la única parte relacionada a la autenticación en el header público para facilitar el acceso en la corrección del T.p.*/}
        <li>
          <Link to={"/login"}>Admin Login</Link>
        </li>
      </ul>
    </nav>
  );
};
