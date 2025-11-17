import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext.jsx"; 

export const AuthProvider = ({ children }) => {
  // 1. Inicializa el estado 'user' leyendo desde sessionStorage una sola vez.
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem("session");
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Error al leer la sesión desde sessionStorage:", error);
      return null;
    }
  });

  // 2. Usa useEffect para guardar el estado 'user' en sessionStorage cada vez que cambie.
  useEffect(() => {
    try {
      if (user) {
        sessionStorage.setItem("session", JSON.stringify(user));
      } else {
        sessionStorage.removeItem("session");
      }
    } catch (error) {
      console.error("Error al guardar la sesión en sessionStorage:", error);
    }
  }, [user]); // Este efecto se ejecuta solo cuando 'user' cambia.

  // 3. Función de login que actualiza el estado. Hardcodeado!!!
  const login = (name, password) => {
    if (name === "admin" && password === "1234") {
      const session = { name };
      setUser(session); // Al cambiar el estado, el useEffect se encargará de guardarlo.
      return true;
    }
    return false;
  };

  // 4. Función de logout para limpiar el estado.
  const logout = () => {
    setUser(null); // Al poner user a null, el useEffect limpiará el sessionStorage.
  };

  // 5. El valor que proveerá el Context a sus hijos.
  const value = { user, login, logout };

  return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
};