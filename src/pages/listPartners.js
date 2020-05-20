import React from "react";
import { FaIdCardAlt, FaHome, FaInfoCircle, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ListPartners() {
  return (
    <>
      <div className="header-component">
        <div className="header-left">
          <FaIdCardAlt style={{ marginRight: 20, fontSize: 20 }} />
          LISTAGEM DE FUNCIONÁRIOS
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
            INFORMAÇÕES DOS FUNCIONÁRIOS
          </span>
          <table className="table-partners" cellSpacing="0">
            <thead>
              <tr>
                <td>FUNCIONÁRIO</td>
                <td>FUNÇÃO</td>
                <td>AÇÕES</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SANTHIAGO</td>
                <td>SERIGRAFO</td>
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
