import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header.jsx"; 
import { AdminNav } from "../components/adminComponents/AdminNav/AdminNav.jsx";

export const AdminLayout = () =>{
    return <>
         {/* Usamos el Header genérico y le pasamos la navegación de admin, uso navComponent como props*/}
         <Header navComponent={<AdminNav />} />
              <main className="main-content">
                <Outlet />
              </main>
    </>
}