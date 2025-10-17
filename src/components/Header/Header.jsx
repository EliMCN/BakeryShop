import { Link } from "react-router-dom";
import { Nav } from "../Nav/Nav";
import "./Header.css";

export const Header = () => {
  return (
    <header className="main-header">
      <Link to="/">
        <img src="/images/logo.png" alt="Logo de la Bakery" className="logo" />
      </Link>
      <Nav />
    </header>
  );
};