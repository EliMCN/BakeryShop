import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { ItemList } from "../ItemList/ItemList";
import { getProducts } from "../../services/products.js"; 
import "./ItemListContainer.css";

export const ItemListContainer = ({subtitle, limit}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams(); // categoría desde la URL
  const navigate = useNavigate(); 

  useEffect(() => {
    setLoading(true);
    getProducts(category)
      .then((data) => {
        // Si se proporciona un límite, cortamos el array de productos. Lo agrego porque en Home mostramos solo 4 productos como destacados.
        if (limit) {
          setProducts(data.slice(0, limit));
        } else {
          // Si no hay límite, mostramos todos los productos
          setProducts(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category, limit]); 

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  const handleFilterChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory) {
      navigate(`/category/${selectedCategory}`);
    } else {
      navigate('/productos');
    }
  };

  return (
    <section className="item-list-section">
       <div className="hero-title">
        <h2>The Bakery Shop</h2>
        <p className="hero-subtitle">
         {subtitle}
        </p>
      </div>
      {/*filtro*/}
      <div className="filter-container">
        <label htmlFor="category-filter">Filtrar por:</label>
        <select id="category-filter" value={category || ''} onChange={handleFilterChange}>
          <option value="">Todos</option>
          <option value="dulce">Dulce</option>
          <option value="salado">Salado</option>
        </select>
      </div>
      <ItemList list={products} />
    </section>
  );
};
