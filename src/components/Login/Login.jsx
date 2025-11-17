import { useState,useEffect } from "react";
import { useAuthContext } from "../../context/AuthContex/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

export const Login = () => {
  const { user, login } = useAuthContext();
  const navigate = useNavigate();

  // Estado local para manejar los inputs del formulario
  const [userForm, setUserForm] = useState({
    name: "",
    password: "",
  });

  // Si el usuario admin ya está logueado, lo redirigimos a la página principal.
  useEffect(() => {
    if (user) {
      navigate("/admin"); 
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(userForm.name, userForm.password);
    if (success) {
      // El useEffect de arriba se encargará de la redirección if user...
      console.log("Login exitoso!");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="name">Usuario</label>
          <input type="text" id="name" name="name" value={userForm.name} onChange={handleChange} required autoComplete="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" value={userForm.password} onChange={handleChange} required autoComplete="current-password" />
        </div>
        <button type="submit" className="login-button">Ingresar</button>
      </form>
    </div>
  );
};