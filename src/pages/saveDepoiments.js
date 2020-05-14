import React, { useState, useMemo } from "react";
import {
  FaHome,
  FaSave,
  FaRocketchat,
  FaImages,
  FaImage,
  FaTimes,
  FaInfoCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import icone from "../assets/icone.svg";
import logo from "../assets/logo.svg";

export default function SaveDepoiments() {
  const [titleDepoimet, setTitleDepoiment] = useState("Título");
  const [imageDepoiment, setImageDepoiment] = useState(null);

  const previewImage = useMemo(() => {
    return imageDepoiment ? URL.createObjectURL(imageDepoiment) : null;
  }, [imageDepoiment]);

  async function removeImageDepoiment() {
    await URL.revokeObjectURL(imageDepoiment);
    setImageDepoiment(null);
  }

  return (
    <>
      <div className="header-component">
        <div className="header-left">
          <FaRocketchat style={{ marginRight: 20, fontSize: 20 }} />
          CADASTRO DE DEPOIMENTOS
        </div>
        <div>
          <Link to="/" className="link-to-home">
            <FaHome />
          </Link>
        </div>
      </div>

      <div className="content-page">
        <div className="used-container">
          <div className="used-item">
            <div className="item-img">
              {!imageDepoiment ? (
                <div className="card-image-icon">
                  <FaImages
                    style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                  />
                </div>
              ) : (
                <img
                  className="img-item-used"
                  alt="Imagem"
                  src={previewImage}
                />
              )}
            </div>
            <div className="item-desc">
              <div className="logo-container-used">
                <img src={icone} alt="icone" className="icone-used" />
                <img src={logo} alt="logo" className="logo-used" />
              </div>
              <span className="used-description">{titleDepoimet}</span>
            </div>
          </div>
        </div>

        <div className="container-info">
          <span className="title-container-info">
            <FaInfoCircle style={{ marginRight: 15 }} />
            INFORMAÇÕES DO PRODUTO
          </span>
          <div className="grid-products-info">
            {imageDepoiment ? (
              <button
                className="remove-img"
                onClick={() => removeImageDepoiment()}
                type="button"
              >
                <FaTimes style={{ fontSize: 50, color: "#f44336" }} />
                <p>{imageDepoiment.name}</p>
              </button>
            ) : (
              <label id="photoFile">
                <input
                  type="file"
                  onChange={(event) => setImageDepoiment(event.target.files[0])}
                />
                <FaImages style={{ fontSize: 30, marginBottom: 20 }} />
                Clique aqui para adicionar a foto do produto
              </label>
            )}
            <div>
              <span className="label">
                Título do Catálogo
                <span
                  style={{
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#777",
                    marginLeft: 15,
                    fontSize: 11,
                  }}
                >
                  Máx. 60 caracteres
                </span>
              </span>
              <input
                type="text"
                className="input-text"
                onChange={(e) => setTitleDepoiment(e.target.value)}
                value={titleDepoimet}
                maxLength={60}
              />
            </div>
          </div>
          <hr className="divider" />
          <div className="container-buttons">
            <button onClick={() => {}} type="button" className="btn-primary">
              <span className="btn-label">
                <FaSave />
              </span>
              <span className="btn-text">Salvar Informações</span>
            </button>
            <button onClick={() => {}} type="button" className="btn-primary">
              <span className="btn-label">
                <FaImage />
              </span>
              <span className="btn-text">Salvar Imagem do Produto</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
