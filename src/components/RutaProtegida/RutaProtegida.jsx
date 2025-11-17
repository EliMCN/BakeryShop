import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContex/useAuthContext";

/**
 * Este componente envuelve a otros componentes para protegerlos.
 * Si el usuario no está autenticado, lo redirige a la página de inicio.
 * Si está autenticado, muestra el contenido protegido (children).
 */
export const RutaProtegida = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) {
    // Si el usuario no está autenticado, lo redirigimos a la página de login.
    return <Navigate to="/login" replace />; // 'replace' evita que el usuario pueda volver a la ruta protegida con el botón "atrás" del navegador.
  }

  // Si el usuario está autenticado, renderiza el componente hijo que se le pasó.
  return children;
};
