import React, { useState, useMemo } from "react";
import {
  FaHome,
  FaPager,
  FaTags,
  FaTshirt,
  FaSave,
  FaImages,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Select from "react-select";

export default function SavePages() {
  const [photoImages, setPhotoImages] = useState(null);
  const [photoCards, setPhotoCards] = useState(null);
  const [descriptionCard, setDescriptionCard] = useState("Descrição...");
  const [titleCard, setTitleCard] = useState("GOLA");
  const [typeFirtsPart, setTypeFirsPart] = useState("cards");

  const previewPhotoImage = useMemo(() => {
    return photoImages ? URL.createObjectURL(photoImages) : null;
  }, [photoImages]);

  const previewPhotoCards = useMemo(() => {
    return photoCards ? URL.createObjectURL(photoCards) : null;
  }, [photoCards]);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <>
      <div className="header-component">
        <div className="header-left">
          <FaPager style={{ marginRight: 20, fontSize: 20 }} />
          CADASTRO DE PÁGINAS DE PRODUTOS
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
            <Select options={options} placeholder="Selecione o Produto" />
          </div>
        </div>

        <div className="title-page-two">
          <div className="header-left">
            <FaTags style={{ marginRight: 20 }} />
            DEMONSTRATIVO DE PRODUTOS (Parte inicial da página)
          </div>
          <div className="radio-container">
            <input
              value="images"
              type="radio"
              id="radio-one"
              name="first-part"
              onChange={(e) => setTypeFirsPart(e.target.value)}
              checked={typeFirtsPart === "images" ? true : false}
            />
            <label className="radio-label" htmlFor="radio-one">
              Imagens com Descrição
            </label>

            <input
              value="cards"
              type="radio"
              id="radio-two"
              name="first-part"
              onChange={(e) => setTypeFirsPart(e.target.value)}
              checked={typeFirtsPart === "cards" ? true : false}
            />
            <label className="radio-label" htmlFor="radio-two">
              Cards Personalizados
            </label>
            <button
              onClick={() => {}}
              type="button"
              className="btn-primary btn-small"
            >
              <span className="btn-label btn-label-small">
                <FaSave />
              </span>
              <span className="btn-text">Salvar Configuração</span>
            </button>
          </div>
        </div>

        {typeFirtsPart === "cards" ? (
          <>
            <span className="title-container-info">EXEMPLOS DOS CARDS</span>
            <div className="cards-row">
              <div className="card-product-two">
                <div
                  className="card-header"
                  style={{ backgroundColor: `rgb(237, 186, 0)`, color: `#fff` }}
                >
                  {titleCard}
                </div>
                {!photoCards ? (
                  <div className="card-image-icon">
                    <FaImages
                      style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                    />
                  </div>
                ) : (
                  <img
                    className="card-product-img"
                    alt="Imagem"
                    src={previewPhotoCards}
                  />
                )}
                <div className="card-content">{descriptionCard}</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="title-container-info">
              EXEMPLOS DAS IMAGENS COM DESCRIÇÃO
            </span>
            <div className="cards-row">
              <div className="card-product-two">
                {!photoImages ? (
                  <div className="card-image-icon">
                    <FaImages
                      style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                    />
                  </div>
                ) : (
                  <img
                    className="card-product-img"
                    alt="Imagem"
                    src={previewPhotoImage}
                  />
                )}
                <div className="card-content">{descriptionCard}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
