import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTshirt, FaHome, FaTimes, FaEdit, FaTags } from "react-icons/fa";
import Select from "react-select";

import tshirt from "../assets/camisa-one-web.png";

export default function ListProduct() {
  const [products, setProducts] = useState([]);
  return (
    <>
      <div className="header-component">
        <div className="header-left">
          <FaTshirt style={{ marginRight: 20, fontSize: 20 }} />
          LISTAGEM DE PRODUTOS
        </div>
        <div>
          <Link to="/" className="link-to-home">
            <FaHome />
          </Link>
        </div>
      </div>
      <div className="content-page">
        <div className="title-page-two">
          <div className="header-left">
            <FaTags style={{ marginRight: 20 }} />
            SELECIONE A CATEGORIA
          </div>
          <div className="select-container">
            <Select
              options={products}
              placeholder="Selecione a Categoria"
              onChange={() => {}}
              noOptionsMessage={() => <p>Nenhuma categoria cadastrada</p>}
            />
          </div>
        </div>
        <div className="grid-list-product">
          <div className="container-card-list">
            <div className="card-product">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
              <span className="title-card-product">CAMISETA ESPORTIVA</span>
              <span className="link-card-product">DESCRIÇÃO</span>
            </div>
            <div className="container-button-card">
              <button onClick={() => {}} type="button" className="btn-blue">
                <FaEdit />
                <span className="btn-text">Editar</span>
              </button>
              <button onClick={() => {}} type="button" className="btn-red">
                <FaTimes />
                <span className="btn-text">Excluir</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
