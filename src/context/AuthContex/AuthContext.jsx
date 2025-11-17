import { createContext } from "react";

// Este archivo solo define el Context.
export const AuthContext = createContext({
  // Valores por defecto para autocompletado y para consumidores fuera del Provider
  user: null,
  login: () => {},
  logout: () => {},
});