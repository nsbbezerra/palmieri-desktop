import React from "react";
import {
  FaHome,
  FaTshirt,
  FaIdCardAlt,
  FaImages,
  FaBars,
  FaPager,
  FaRocketchat,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div style={{ overflow: "hidden" }}>
      <div className="header">
        <FaHome style={{ marginRight: 20, fontSize: 20 }} />
        INÍCIO
      </div>
      <div className="content-page">
        <div className="grid-cards">
          <div className="card">
            <div className="card-row">
              <FaTshirt className="icon-card" />
              PRODUTOS CADASTRADOS
              <span className="count">380</span>
            </div>
          </div>
          <div className="card">
            <div className="card-row">
              <FaIdCardAlt className="icon-card" />
              FUNCIONÁRIOS CADASTRADOS
              <span className="count">0</span>
            </div>
          </div>
          <div className="card">
            <div className="card-row">
              <FaImages className="icon-card" />
              PORTIFÓLIO CADASTRADOS
              <span className="count">0</span>
            </div>
          </div>
        </div>

        <div className="title-page">
          <FaBars style={{ marginRight: 20 }} />
          ACESSO RÁPIDO
        </div>

        <div className="grid-five">
          <Link to="/saveProducts" className="action-button">
            <FaTshirt className="action-button-icon" />
            CADASTRO DE PRODUTOS
          </Link>
          <Link to="/savePages" className="action-button">
            <FaPager className="action-button-icon" />
            CADASTRO DE PÁGINAS
          </Link>
          <Link to="/savePartners" className="action-button">
            <FaIdCardAlt className="action-button-icon" />
            CADASTRO DE FUNCIONÁRIOS
          </Link>
          <Link to="/saveCatalog" className="action-button">
            <FaImages className="action-button-icon" />
            CADASTRO DE CATÁLOGOS
          </Link>
          <Link to="/saveDepoiment" className="action-button">
            <FaRocketchat className="action-button-icon" />
            CADASTRO DE DEPOIMENTOS
          </Link>
        </div>

        <div className="grid-five">
          <Link to="/listProducts" className="action-button">
            <FaTshirt className="action-button-icon" />
            LISTAGEM DE PRODUTOS
          </Link>
          <Link to="/listPartners" className="action-button">
            <FaIdCardAlt className="action-button-icon" />
            LISTAGEM DE FUNCIONÁRIOS
          </Link>
          <Link to="/listDepoiments" className="action-button">
            <FaRocketchat className="action-button-icon" />
            LISTAGEM DE DEPOIMENTOS
          </Link>
        </div>
      </div>
    </div>
  );
}
