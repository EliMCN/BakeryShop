import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";
import "./ItemListContainer.css";

export const ItemListContainer = ({subtitle}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("There was a problem fetching the products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="item-list-section">
       <div className="hero-title">
        <h1>The Bakery Shop</h1>
        <p className="hero-subtitle">
         {subtitle}
        </p>
      </div> 
      <ItemList list={products} />
    </section>
  );
};


// When we filter, we will add dependencies to useEffect