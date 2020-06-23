import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTags, FaHome, FaInfoCircle, FaSave } from "react-icons/fa";

import tshirt from "../assets/camisa-one-web.png";

export default function Category() {
  const [name, setName] = useState("CATEGORIA");
  const [imgAlt, setImgAlt] = useState("");
  return (
    <>
      <div className="header-component">
        <div className="header-left">
          <FaTags style={{ marginRight: 20, fontSize: 20 }} />
          CADASTRO DE CATEGORIAS
        </div>
        <div>
          <Link to="/" className="link-to-home">
            <FaHome />
          </Link>
        </div>
      </div>

      <div className="content-page">
        <div className="center-card">
          <div className="card-category">
            <div className="container-img-card-category">
              <img
                alt="card category"
                src={tshirt}
                className="card-category-img"
              />
            </div>
            <span className="title-card-category">{name}</span>
            <span className="link-card-category">VEJA MAIS</span>
          </div>
        </div>

        <div className="container-info">
          <span className="title-container-info">
            <FaInfoCircle style={{ marginRight: 15 }} />
            INFORMAÇÕES DA CATEGORIA
          </span>
          <div className="grid-category">
            <div>
              <span className="label">Nome da Categoria</span>
              <input
                type="text"
                className="input-text"
                onChange={(e) => setName(e.target.value.toUpperCase())}
                value={name}
              />
            </div>
            <div>
              <span className="label">Descrição para a Imagem</span>
              <input
                type="text"
                className="input-text"
                onChange={(e) => setImgAlt(e.target.value)}
                value={imgAlt}
              />
            </div>
          </div>
          <hr className="divider" />
          <div className="container-buttons">
            <button onClick={() => {}} type="button" className="btn-primary">
              <span className="btn-label">
                <FaSave />
              </span>
              <span className="btn-text">Salvar</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
