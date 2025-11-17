import { useState } from "react";
import "./ItemCount.css";

export const ItemCount = ({
  stock = 10,
  initial = 1,
  onAdd,
  btnText = "Agregar al carrito",
}) => {
  const [count, setCount] = useState(initial);

  const increment = () => {
    setCount((prevCount) => (prevCount < stock ? prevCount + 1 : prevCount));
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
  };

  return (
    <div className="item-count">
      <div className="controls">
        <button onClick={decrement} disabled={count <= 1}>
          -
        </button>
        <span>{count}</span>
        <button onClick={increment} disabled={count >= stock}>
          +
        </button>
      </div>
      <button className="add-to-cart-btn" onClick={() => onAdd(count)} disabled={stock === 0 || count === 0}>{btnText}</button>
    </div>
  );
};