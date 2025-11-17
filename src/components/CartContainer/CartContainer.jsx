import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext/CartContext';
import { Cart } from '../Cart/Cart'; 
import styles from './CartContainer.module.css'; 

export const CartContainer = () => {
  // 1. Obtenemos toda la lógica y datos del contexto
  const { 
    cartItems, 
    removeItem, 
    updateItemQuantity, 
    clearCart, 
    totalPrice 
  } = useContext(CartContext);
  
  const navigate = useNavigate();

  // 2. Definimos los manejadores de eventos- volver!
  const handleGoBack = () => {
    navigate(-1);
  };

  // 3. Pasamos todos los datos y funciones como props al componente de UI
  //    y lo envolvemos con nuestro div contenedor.
  return (
    <section className={styles.container}>
      <Cart 
        cartItems={cartItems}
        totalPrice={totalPrice}
        handleGoBack={handleGoBack}
        updateItemQuantity={updateItemQuantity}
        removeItem={removeItem}
        clearCart={clearCart}
      />
    </section>
  );
};