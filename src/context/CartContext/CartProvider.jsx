import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
 
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  // Recalcula el total y la cantidad cada vez que el carrito cambia
  useEffect(() => {
    const newQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const newTotalPrice = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
    setQuantity(newQuantity);
  }, [cartItems]);

  const isInCart = (id) => {
    return cartItems.some((item) => item.product.id === id);
  };

  const addItem = (item, quantity) => {
    if (isInCart(item.id)) {
      // Si el producto ya está, actualizamos su cantidad
      setCartItems((prevItems) =>
        prevItems.map((cartItem) => {
          if (cartItem.product.id === item.id) {
            const newQuantity = cartItem.quantity + quantity;
            // Validar contra el stock disponible
            if (newQuantity > item.stock) {              
              console.warn(`No se puede agregar más stock de ${item.name}`);
              return cartItem; // No se modifica
            }
            return { ...cartItem, quantity: newQuantity };
          }
          return cartItem;
        })
      );
    } else {
      // Si es un producto nuevo, lo agregamos
      setCartItems((prevItems) => [...prevItems, { product: item, quantity }]);
    }
  };

  // Función para actualizar la cantidad desde el carrito
  const updateItemQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId); // Si la cantidad es 0 o menos, lo eliminamos
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    totalPrice,
    quantity,
    addItem,
    removeItem,
    clearCart,
    updateItemQuantity, 
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};