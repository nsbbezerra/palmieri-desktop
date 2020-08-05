import React from "react";
import { Link } from "react-router-dom";
import {
  FaSave,
  FaListUl,
  FaTshirt,
  FaImages,
  FaTags,
  FaComments,
  FaRulerHorizontal,
} from "react-icons/fa";

export default function Menu() {
  return (
    <>
      <div className="menu-title">
        <FaSave style={{ marginRight: 10 }} />
        CADASTROS
      </div>
      <ul className="menu">
        <li className="menu-item">
          <Link to="/category" className="menu-link" draggable={false}>
            <FaTags style={{ marginRight: 15 }} />
            CATEGORIAS
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/product" className="menu-link" draggable={false}>
            <FaTshirt style={{ marginRight: 15 }} />
            PRODUTOS
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/catalog" className="menu-link" draggable={false}>
            <FaImages style={{ marginRight: 15 }} />
            CATÁLOGO
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/comments" className="menu-link" draggable={false}>
            <FaComments style={{ marginRight: 15 }} />
            COMENTÁRIOS
          </Link>
        </li>
      </ul>
      <div className="menu-title border-on-top">
        <FaListUl style={{ marginRight: 10 }} />
        LISTAGENS
      </div>
      <ul className="menu">
        <li className="menu-item">
          <Link to="/listCategory" className="menu-link" draggable={false}>
            <FaTags style={{ marginRight: 15 }} />
            CATEGORIAS
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/listProduct" className="menu-link" draggable={false}>
            <FaTshirt style={{ marginRight: 15 }} />
            PRODUTOS
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/listCatalog" className="menu-link" draggable={false}>
            <FaImages style={{ marginRight: 15 }} />
            CATÁLOGO
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/listComments" className="menu-link" draggable={false}>
            <FaComments style={{ marginRight: 15 }} />
            COMENTÁRIOS
          </Link>
        </li>
      </ul>
      <div className="menu-title border-on-top">
        <FaRulerHorizontal style={{ marginRight: 10 }} />
        MODELAGEM
      </div>
      <ul className="menu">
        <li className="menu-item">
          <Link to="/modelagem" className="menu-link" draggable={false}>
            <FaRulerHorizontal style={{ marginRight: 15 }} />
            MODELAGENS
          </Link>
        </li>
      </ul>
    </>
  );
}
