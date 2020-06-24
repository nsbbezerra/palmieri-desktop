import React from "react";
import { Link } from "react-router-dom";
import { FaTags, FaHome, FaTimes, FaEdit } from "react-icons/fa";

import tshirt from "../assets/camisa-one-web.png";

export default function ListCategory() {
  return (
    <>
      <div className="header-component">
        <div className="header-left">
          <FaTags style={{ marginRight: 20, fontSize: 20 }} />
          LISTAGEM DE CATEGORIAS
        </div>
        <div>
          <Link to="/" className="link-to-home">
            <FaHome />
          </Link>
        </div>
      </div>
      <div className="content-page">
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
              <span className="title-card-category">CAMISETA ESPORTIVA</span>
              <span className="link-card-category">VEJA MAIS</span>
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
          <div className="container-card-list">
            <div className="card-category">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
              <span className="title-card-category">CAMISETA ESPORTIVA</span>
              <span className="link-card-category">VEJA MAIS</span>
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
          <div className="container-card-list">
            <div className="card-category">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
              <span className="title-card-category">CAMISETA ESPORTIVA</span>
              <span className="link-card-category">VEJA MAIS</span>
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
          <div className="container-card-list">
            <div className="card-category">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
              <span className="title-card-category">CAMISETA ESPORTIVA</span>
              <span className="link-card-category">VEJA MAIS</span>
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
          <div className="container-card-list">
            <div className="card-category">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
              <span className="title-card-category">CAMISETA ESPORTIVA</span>
              <span className="link-card-category">VEJA MAIS</span>
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
          <div className="container-card-list">
            <div className="card-category">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
              <span className="title-card-category">CAMISETA ESPORTIVA</span>
              <span className="link-card-category">VEJA MAIS</span>
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
          <div className="container-card-list">
            <div className="card-category">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
              <span className="title-card-category">CAMISETA ESPORTIVA</span>
              <span className="link-card-category">VEJA MAIS</span>
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
          <div className="container-card-list">
            <div className="card-category">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
              <span className="title-card-category">CAMISETA ESPORTIVA</span>
              <span className="link-card-category">VEJA MAIS</span>
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
          <div className="container-card-list">
            <div className="card-category">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
              <span className="title-card-category">CAMISETA ESPORTIVA</span>
              <span className="link-card-category">VEJA MAIS</span>
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
          <div className="container-card-list">
            <div className="card-category">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
              <span className="title-card-category">CAMISETA ESPORTIVA</span>
              <span className="link-card-category">VEJA MAIS</span>
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
