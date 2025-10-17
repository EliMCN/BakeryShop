import { useContext } from "react";
import { ItemCount } from "../ItemCount/ItemCount";
import { CartContext } from "../../context/CartContext/CartContext";
import { Link } from "react-router-dom";
import "./ItemDetail.css";

export const ItemDetail = ({ detail }) => {
  // 1. We connect to the context to get the `addItem` function
  const { addItem } = useContext(CartContext);

  // 2. We create a function that will be executed when the user clicks "Add to cart"
  const onAdd = (quantity) => {
    addItem(detail, quantity);
    alert(`You added ${quantity} "${detail.name}" to the cart.`);
  };

  const { name, price, description, imageUrl } = detail;

  return (
    <div className="item-detail">
      <img src={imageUrl} alt={description} className="item-detail-image" />
      <div className="item-detail-info">
        <h1>{name}</h1>
        <p>{description}</p>
        <p>Price: ${price}</p>
      </div>
      {/* 3. We use the counter and pass it the `onAdd` function */}
      <ItemCount onAdd={onAdd} />
      <Link to="/" className="continue-shopping-btn">
        Seguir comprando
      </Link>
    </div>
  );
};
