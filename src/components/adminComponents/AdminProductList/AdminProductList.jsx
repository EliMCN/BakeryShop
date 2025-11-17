import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../../services/products.js';
import './AdminProductList.css';

export const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const fetchProducts = (category) => {
    setLoading(true);
    getProducts(category) 
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Cargar productos cuando el componente se monta o cuando el filtro cambia
  useEffect(() => {
    fetchProducts(categoryFilter);
  }, [categoryFilter]); 

    const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleDelete = async (productId) => {
    // Pedimos confirmación antes de eliminar
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProduct(productId);
        // Si se elimina con éxito, volvemos a cargar la lista con el filtro actual
        fetchProducts(categoryFilter);
      } catch (err) {
        alert('Error al eliminar el producto: ' + err.message);
      }
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos: {error}</p>;


  return (
    <div className="admin-product-list-container">
      <h1>Gestión de Productos</h1>
       <div className="admin-product-list-header">       
        <button onClick={() => navigate("/admin/alta-productos")} className="add-product-button">Agregar Producto</button>
        <div className="filter-group">
          <label htmlFor="admin-category-filter">Filtrar por categoría:</label>
            <select id="admin-category-filter" className="filter-select" value={categoryFilter} onChange={handleCategoryChange}>
                  <option value="">Todas las categorías</option>
                  <option value="dulce">Dulce</option>
                  <option value="salado">Salado</option>
            </select>
          </div>
        </div>
      <table className="products-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td><img src={product.imageUrl} alt={product.name} className="product-image-thumbnail" /></td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td className="product-actions">
                <Link to={`/admin/editar-producto/${product.id}`} className="edit-button">Editar</Link>
                <button onClick={() => handleDelete(product.id)} className="delete-button">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};