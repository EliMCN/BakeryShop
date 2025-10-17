import { Link } from "react-router-dom";
import { Item } from "../Item/Item";
import "./ItemList.css";

export const ItemList = ({ list }) => {
  return (
    <div className="item-list-container">
      {list.length ? (
        list.map((prod) => (
          // La key va en el elemento raíz que se mapea, en este caso el Link. Evitamos burbujeo de eventos
          <Link to={`/detail/${prod.id}`} key={prod.id}>
            <Item {...prod} />
          </Link>
        ))
      ) : (
        <p className="loading-text">Cargando productos...</p>
      )}
    </div>
  );
};
