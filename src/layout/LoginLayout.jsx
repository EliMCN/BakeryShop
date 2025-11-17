import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header.jsx";
import { Footer } from "../components/Footer/Footer.jsx"; 

export const LoginLayout = () => {
  return (
    <div className="app-container">
      {/* Usamos el Header genérico, pero no le pasamos ningún navComponent
          para que solo muestre el logo (que ya está linkeado a Home) desde el Header.jsx */}
      <Header navComponent={null} /> 
      <main className="main-content">
        <Outlet />
      </main>     
      <Footer />
    </div>
  );
};