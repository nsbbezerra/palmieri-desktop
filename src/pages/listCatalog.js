import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaImages, FaHome, FaTimes, FaTshirt } from "react-icons/fa";
import Select from "react-select";

import tshirt from "../assets/camisa-one-web.png";

export default function ListCatalog() {
  const [products, setProducts] = useState([]);
  return (
    <>
      <div className="header-component">
        <div className="header-left">
          <FaImages style={{ marginRight: 20, fontSize: 20 }} />
          LISTAGEM DE CATÁLOGO
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
            <FaTshirt style={{ marginRight: 20 }} />
            SELECIONE O PRODUTO
          </div>
          <div className="select-container">
            <Select
              options={products}
              placeholder="Selecione o Produto"
              onChange={() => {}}
              noOptionsMessage={() => <p>Nenhum produto Cadastrado</p>}
            />
          </div>
        </div>
        <div className="grid-list-category">
          <div className="container-card-list">
            <div className="card-category">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
            </div>
            <div className="container-button-card-catalog">
              <button onClick={() => {}} type="button" className="btn-red">
                <FaTimes />
                <span className="btn-text">Excluir Item</span>
              </button>
            </div>
          </div>
          <div className="container-card-list">
            <div className="card-category">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
            </div>
            <div className="container-button-card-catalog">
              <button onClick={() => {}} type="button" className="btn-red">
                <FaTimes />
                <span className="btn-text">Excluir Item</span>
              </button>
            </div>
          </div>
          <div className="container-card-list">
            <div className="card-category">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
            </div>
            <div className="container-button-card-catalog">
              <button onClick={() => {}} type="button" className="btn-red">
                <FaTimes />
                <span className="btn-text">Excluir Item</span>
              </button>
            </div>
          </div>
          <div className="container-card-list">
            <div className="card-category">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
            </div>
            <div className="container-button-card-catalog">
              <button onClick={() => {}} type="button" className="btn-red">
                <FaTimes />
                <span className="btn-text">Excluir Item</span>
              </button>
            </div>
          </div>
          <div className="container-card-list">
            <div className="card-category">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
            </div>
            <div className="container-button-card-catalog">
              <button onClick={() => {}} type="button" className="btn-red">
                <FaTimes />
                <span className="btn-text">Excluir Item</span>
              </button>
            </div>
          </div>
          <div className="container-card-list">
            <div className="card-category">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
            </div>
            <div className="container-button-card-catalog">
              <button onClick={() => {}} type="button" className="btn-red">
                <FaTimes />
                <span className="btn-text">Excluir Item</span>
              </button>
            </div>
          </div>
          <div className="container-card-list">
            <div className="card-category">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
            </div>
            <div className="container-button-card-catalog">
              <button onClick={() => {}} type="button" className="btn-red">
                <FaTimes />
                <span className="btn-text">Excluir Item</span>
              </button>
            </div>
          </div>
          <div className="container-card-list">
            <div className="card-category">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
            </div>
            <div className="container-button-card-catalog">
              <button onClick={() => {}} type="button" className="btn-red">
                <FaTimes />
                <span className="btn-text">Excluir Item</span>
              </button>
            </div>
          </div>
          <div className="container-card-list">
            <div className="card-category">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
            </div>
            <div className="container-button-card-catalog">
              <button onClick={() => {}} type="button" className="btn-red">
                <FaTimes />
                <span className="btn-text">Excluir Item</span>
              </button>
            </div>
          </div>
          <div className="container-card-list">
            <div className="card-category">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
            </div>
            <div className="container-button-card-catalog">
              <button onClick={() => {}} type="button" className="btn-red">
                <FaTimes />
                <span className="btn-text">Excluir Item</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
