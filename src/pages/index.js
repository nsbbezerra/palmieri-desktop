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

export default function Index() {
  return (
    <>
      <div className="header">
        <FaHome style={{ marginRight: 20 }} />
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
          <div className="action-button">
            <FaTshirt className="action-button-icon" />
            CADASTRO DE PRODUTOS
          </div>
          <div className="action-button">
            <FaPager className="action-button-icon" />
            CADASTRO DE PÁGINAS
          </div>
          <div className="action-button">
            <FaIdCardAlt className="action-button-icon" />
            CADASTRO DE FUNCIONÁRIOS
          </div>
          <div className="action-button">
            <FaImages className="action-button-icon" />
            CADASTRO DE PORTIFÓLIOS
          </div>
          <div className="action-button">
            <FaRocketchat className="action-button-icon" />
            CADASTRO DE DEPOIMENTOS
          </div>
        </div>

        <div className="grid-five">
          <div className="action-button">
            <FaTshirt className="action-button-icon" />
            LISTAGEM DE PRODUTOS
          </div>
          <div className="action-button">
            <FaIdCardAlt className="action-button-icon" />
            LISTAGEM DE FUNCIONÁRIOS
          </div>
          <div className="action-button">
            <FaImages className="action-button-icon" />
            LISTAGEM DE PORTIFÓLIOS
          </div>
          <div className="action-button">
            <FaRocketchat className="action-button-icon" />
            LISTAGEM DE DEPOIMENTOS
          </div>
        </div>
      </div>
    </>
  );
}
