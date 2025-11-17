import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css'; 
import { FiArrowLeft, FiTrash2, FiShoppingBag, FiPlus, FiMinus } from "react-icons/fi";

// Recibe todas las props necesarias desde CartContainer
export const Cart = ({ 
  cartItems, 
  totalPrice, 
  handleGoBack, 
  updateItemQuantity, 
  removeItem, 
  clearCart 
}) => {

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCartContainer}>
        <h2 className={styles.cartTitle}>Tu carrito está vacío</h2>
        <p>Parece que aún no has añadido ningún producto.</p>
        <Link to="/" className={`${styles.buttonBase} ${styles.btnContinueShopping}`}>
          <FiShoppingBag className={styles.icon} /> Ver productos
        </Link>
      </div>
    );
  }

  return (
    <>
      <button 
        onClick={handleGoBack}
        className={`${styles.buttonBase} ${styles.backButton}`}
      >
        <FiArrowLeft className={styles.icon} /> Volver
      </button>

      <h1 className={styles.cartTitle}>Tu Carrito de Compras</h1>

      {/* Encabezado de la tabla del carrito */}
      <div className={styles.cartTable}>
        <div className={styles.cartHeader}>
          <div className={styles.headerProduct}>Producto</div>
          <div className={styles.headerPrice}>Precio</div>
          <div className={styles.headerQuantity}>Cantidad</div>
          <div className={styles.headerSubtotal}>Subtotal</div>
          <div>{/* Columna vacía para el botón de eliminar */}</div>
        </div>

        {/* Lista de items */}
        {cartItems.map((item) => (
          <div key={item.product.id} className={styles.cartItem}>
            {/* Celda del Producto (Imagen + Nombre) */}
            <div className={styles.productCell}>
              <img 
                src={item.product.imageUrl} 
                alt={item.product.name} 
                className={styles.cartItemImage} 
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/D3D3D3/2E2E2E?text=N/A" }}
              />
              <div className={styles.productInfo}>
                <h2>{item.product.name}</h2>
              </div>
            </div>

            {/* Celda de Precio */}
            <div className={styles.price}>${item.product.price.toFixed(2)}</div>

            {/* Celda de Cantidad */}
            <div className={styles.quantityControl}>
              <button onClick={() => updateItemQuantity(item.product.id, item.quantity - 1)} className={styles.quantityButton}>
                <FiMinus />
              </button>
              <span className={styles.itemQuantity}>{item.quantity}</span>
              <button onClick={() => updateItemQuantity(item.product.id, item.quantity + 1)} disabled={item.quantity >= item.product.stock} className={styles.quantityButton}>
                <FiPlus />
              </button>
            </div>
            
            {/* Celda de Subtotal */}
            <div className={styles.subtotal}>${(item.product.price * item.quantity).toFixed(2)}</div>
            
            {/* Celda de Acción (Eliminar) */}
            <button onClick={() => removeItem(item.product.id)} className={`${styles.buttonBase} ${styles.btnRemoveItem}`} title="Eliminar producto">
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>

      <div className={styles.cartSummary}>
        <p className={styles.cartTotal}>
          Total: ${totalPrice.toFixed(2)}
        </p>
        <div className={styles.buttonGroup}>
          <Link to="/checkout" className={`${styles.buttonBase} ${styles.btnCheckout}`}>
            <FiShoppingBag className={styles.icon} /> Finalizar Compra
          </Link>
          <Link to="/" className={`${styles.buttonBase} ${styles.btnContinueShopping}`}>
            <FiArrowLeft className={styles.icon} /> Seguir Comprando
          </Link>
          <button onClick={clearCart} className={`${styles.buttonBase} ${styles.btnClear}`}>
            <FiTrash2 className={styles.icon} /> Vaciar Carrito
          </button>
            </div>
          </div>
    </>
  );
};