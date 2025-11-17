import { Link } from "react-router-dom";
import "./Header.css";
import logoImage from "../../assets/logo.png"; 

export const Header = ({ navComponent }) => {
  return (
    <header className="main-header">
      <Link to="/">       
        <img src={logoImage} alt="Logo de la Bakery" className="logo" />
      </Link>
      {navComponent}
    </header>
  );
};