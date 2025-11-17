//src\components\UnderConstruction\UnderConstruction.jsx
//La pagina se renderizo en la pre-entrega del T.P. Ahora se utilizan los filtros en el containerList por category

import { Link } from "react-router-dom";
import "./UnderConstruction.css";

export const UnderConstruction = () => {
  return (
    <div className="under-construction-container">
      <h1 className="under-construction-title">¡Página en Construcción!</h1>
      <p className="under-construction-message">
        Estamos trabajando para traerte algo increíble. ¡Vuelve pronto!
      </p>
      <Link to="/" className="back-home-button">
        Volver al Inicio
      </Link>
    </div>
  );
};