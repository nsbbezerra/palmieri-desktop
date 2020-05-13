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
          <Link to="/saveProducts" className="menu-link">
            <FaTshirt style={{ marginRight: 15 }} />
            PRODUTOS
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/savePages" className="menu-link">
            <FaPager style={{ marginRight: 15 }} />
            PÁGINAS
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/" className="menu-link">
            <FaIdCardAlt style={{ marginRight: 15 }} />
            FUNCIONÁRIOS
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/" className="menu-link">
            <FaImages style={{ marginRight: 15 }} />
            PORTIFÓLIO
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/" className="menu-link">
            <FaRocketchat style={{ marginRight: 15 }} />
            DEPOIMENTOS
          </Link>
        </li>
      </ul>
      <div className="menu-title border-on-top">
        <FaListUl style={{ marginRight: 10 }} />
        LISTAGENS
      </div>
      <ul className="menu">
        <li className="menu-item">
          <Link to="/" className="menu-link">
            <FaTshirt style={{ marginRight: 15 }} />
            PRODUTOS
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/" className="menu-link">
            <FaIdCardAlt style={{ marginRight: 15 }} />
            FUNCIONÁRIOS
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/" className="menu-link">
            <FaImages style={{ marginRight: 15 }} />
            PORTIFÓLIO
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/" className="menu-link">
            <FaRocketchat style={{ marginRight: 15 }} />
            DEPOIMENTOS
          </Link>
        </li>
      </ul>
    </>
  );
}
