import React from "react";
import { Link } from "react-router-dom";
import {
  FaSave,
  FaListUl,
  FaTshirt,
  FaPager,
  FaIdCardAlt,
  FaImages,
  FaRocketchat,
  FaHome,
  FaTags,
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
          <Link to="/" className="menu-link">
            <FaHome style={{ marginRight: 15 }} />
            PÁGINA INICIAL
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/category" className="menu-link">
            <FaTags style={{ marginRight: 15 }} />
            CATEGORIAS
          </Link>
        </li>
      </ul>
      <div className="menu-title border-on-top">
        <FaListUl style={{ marginRight: 10 }} />
        LISTAGENS
      </div>
      <ul className="menu"></ul>
    </>
  );
}
