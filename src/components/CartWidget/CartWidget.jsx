import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext/CartContext";
import "./CartWidget.css";

export const CartWidget = () => {
  // Usamos useContext para acceder al estado 'quantity' del carrito
  const { quantity } = useContext(CartContext);

  return (
    <Link to="/cart" className="cart-widget">
      {/* carrito img:ícono de Font Awesome */}
      <i className="fa-solid fa-cart-shopping"></i>
      {/* Solo mostramos el número si hay productos en el carrito */}
      {quantity > 0 && <span className="cart-quantity">{quantity}</span>}
    </Link>
  );
};