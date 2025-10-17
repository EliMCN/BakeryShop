import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  // Recalculate total and quantity whenever the cart changes
  useEffect(() => {
    const newTotal = cart.reduce((acc, prod) => acc + prod.price * prod.quantity, 0);
    const newQuantity = cart.reduce((acc, prod) => acc + prod.quantity, 0);
    setTotal(newTotal);
    setQuantity(newQuantity);
  }, [cart]);
  
  const getCartQuantity = () => {
    return cart.reduce((acc, prod) => acc + prod.quantity, 0);
  };

  const isInCart = (id) => {
    return cart.some((prod) => prod.id === id);
  };

  const addItem = (item, quantity) => {
    if (isInCart(item.id)) {
      // If the product is already in the cart, update its quantity
      setCart(
        cart.map((prod) =>
          prod.id === item.id
            ? { ...prod, quantity: prod.quantity + quantity }
            : prod
        )
      );
    } else {
      // If it's a new product, add it to the cart
      setCart([...cart, { ...item, quantity }]);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter((prod) => prod.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Create the 'value' object that will be accessible by child components
  const value = { cart, total, quantity, addItem, removeItem, clearCart, isInCart, getCartQuantity };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};