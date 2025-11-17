import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { CartProvider } from "./context/CartContext/CartProvider";
import { AuthProvider } from "./context/AuthContex/AuthProvider"; 
import { CartContainer } from "./components/CartContainer/CartContainer";
import { RutaProtegida } from "./components/RutaProtegida/RutaProtegida";
import { Login } from "./components/Login/login.jsx";
import { AdminLayout } from "./layout/AdminLayout.jsx"; 
import { ProductFormContainer } from "./components/adminComponents/ProductFormContainer/ProductFormContainer";
import { PublicLayout } from "./layout/PublicLayout.jsx";
import { LoginLayout } from "./layout/LoginLayout.jsx"; 
import { Checkout } from "./components/Checkout/Checkout.jsx";
import { Home } from "./components/Home/Home.jsx";
import { AdminProductList } from "./components/adminComponents/AdminProductList/AdminProductList.jsx";


function App() {
  return (
    <>
      <BrowserRouter>        
        <AuthProvider>
          <CartProvider>
            <Routes>
              {/* --- Rutas Públicas --- */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<ItemListContainer subtitle={"Nuestros productos"} />} />
                <Route path="/detail/:id" element={<ItemDetailContainer />} />
                <Route path="/category/:category" element={<ItemListContainer subtitle={"Nuestros productos"} />} />
                <Route path="/cart" element={<CartContainer />} /> 
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<ItemListContainer subtitle={"¡Bienvenido a nuestra tienda!"} />} />
              </Route>

              {/* --- Rutas de Autenticación y Administración --- */}
              <Route element={<LoginLayout />}> 
                <Route path="/login" element={<Login />} />
              </Route>
              <Route path="/admin" element={<RutaProtegida><AdminLayout /></RutaProtegida>}>
                <Route index element={<AdminProductList />} />
                <Route path="alta-productos" element={<ProductFormContainer />} />
                <Route path="editar-producto/:id" element={<ProductFormContainer />} />
              </Route>
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
