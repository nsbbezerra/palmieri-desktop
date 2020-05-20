import React from "react";
import { FaTags, FaHome, FaInfoCircle, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ListProducts() {
  return (
    <>
      <div className="header-component">
        <div className="header-left">
          <FaTags style={{ marginRight: 20, fontSize: 20 }} />
          LISTAGEM DE PRODUTOS
        </div>
        <div>
          <Link to="/" className="link-to-home">
            <FaHome />
          </Link>
        </div>
      </div>

      <div className="content-page">
        <div className="container-info">
          <span className="title-container-info">
            <FaInfoCircle style={{ marginRight: 15 }} />
            INFORMAÇÕES DOS PRODUTOS
          </span>
          <table className="table-products" cellSpacing="0">
            <thead>
              <tr>
                <td>PRODUTO</td>
                <td>AÇÕES</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CAMISETA DE CICLISMO</td>
                <td>
                  <button className="btn-circle">
                    <FaTimes />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
