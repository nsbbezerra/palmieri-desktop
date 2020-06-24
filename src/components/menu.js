import React from "react";
import { Link } from "react-router-dom";
import { FaSave, FaListUl, FaTshirt, FaImages, FaTags } from "react-icons/fa";

export default function Menu() {
  return (
    <>
      <div className="menu-title">
        <FaSave style={{ marginRight: 10 }} />
        CADASTROS
      </div>
      <ul className="menu">
        <li className="menu-item">
          <Link to="/category" className="menu-link">
            <FaTags style={{ marginRight: 15 }} />
            CATEGORIAS
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/product" className="menu-link">
            <FaTshirt style={{ marginRight: 15 }} />
            PRODUTOS
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/catalog" className="menu-link">
            <FaImages style={{ marginRight: 15 }} />
            CATÁLOGO
          </Link>
        </li>
      </ul>
      <div className="menu-title border-on-top">
        <FaListUl style={{ marginRight: 10 }} />
        LISTAGENS
      </div>
      <ul className="menu">
        <li className="menu-item">
          <Link to="/listCategory" className="menu-link">
            <FaTags style={{ marginRight: 15 }} />
            CATEGORIAS
          </Link>
        </li>
      </ul>
    </>
  );
}
