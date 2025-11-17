import { useEffect, useState } from "react";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import "./ItemDetailContainer.css";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/products.js"; 


export const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     

  
  const { id } = useParams();

  useEffect(() => {
    // Reiniciamos los estados al iniciar una nueva carga
    setLoading(true);
    setError(null);
    setProduct(null); // Limpiamos el producto anterior mientras carga el nuevo

    // Usamos la función del servicio para obtener el producto por ID
    getProductById(id)
      .then((data) => {
        setProduct(data); // Asignamos el producto encontrado
      })
      .catch((err) => {
        console.error("Error al obtener los detalles del producto:", err);
        setError(err.message || "Producto no encontrado."); // Capturamos el error
      })
      .finally(() => {
        setLoading(false); // Finalizamos la carga, independientemente del resultado
      });
  }, [id]);

  if (loading) {
    return <p className="loading-message">Cargando detalles del producto...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  return (
    <main className="item-detail-container">
      {product ? <ItemDetail detail={product} /> : <p>Producto no encontrado.</p>}
    </main>
  );
};
