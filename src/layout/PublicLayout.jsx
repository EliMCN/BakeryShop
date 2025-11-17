import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { Nav } from "../components/Nav/Nav";

export const PublicLayout = () => {
  return (
    <div className="app-container">
      {/* Usamos el Header genérico y le pasamos la navegación pública */}
      <Header navComponent={<Nav />} />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};