import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { UnderConstruction } from "./components/UnderConstruction/UnderConstruction";
import { CartProvider } from "./context/CartContext/CartProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* Envolvemos la app con el Provider para que todos los componentes hijos tengan acceso al contexto */}
        <CartProvider>
          <div className="app-container">
            <Header />
            <main className="main-content">
              {/* Dejamos fuera de Routes lo que queremos que no se vuelva a renderizar al navegar */}
              <Routes>
                <Route
                  path="/"
                  element={<ItemListContainer subtitle={"Hecho a mano con amor y los ingredientes más frescos. ¡Perfecto para acompañar tu mate!"} />}
                />
                <Route path="/detail/:id" element={<ItemDetailContainer />} />
                <Route path="/category/:id" element={<UnderConstruction />} />
                <Route path="/cart" element={<UnderConstruction />} />

                {/* Fallback route for any other path */}
                <Route path="*" element={<ItemListContainer subtitle={"¡Bienvenido a nuestra tienda!"} />} />
              </Routes>
            </main>
            {/* El Footer va fuera del main para que podamos posicionarlo correctamente al final. Queda Header y Footer siempre en cada pages. */}
            <Footer />
          </div>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
