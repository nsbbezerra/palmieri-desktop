import React, { useState, useMemo } from "react";
import {
  FaTshirt,
  FaHome,
  FaSearch,
  FaImages,
  FaInfoCircle,
  FaTimes,
  FaSave,
  FaImage,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SaveProducts() {
  const [title, setTitle] = useState("TÍTULO");
  const [description, setDescription] = useState("Descrição...");
  const [banner, setBanner] = useState(null);
  const [photo, setPhoto] = useState(null);

  const previewBanner = useMemo(() => {
    return banner ? URL.createObjectURL(banner) : null;
  }, [banner]);

  const previewPhoto = useMemo(() => {
    return photo ? URL.createObjectURL(photo) : null;
  }, [photo]);

  async function removeBanner() {
    await URL.revokeObjectURL(banner);
    setBanner(null);
  }

  async function removePhoto() {
    await URL.revokeObjectURL(photo);
    setPhoto(null);
  }

  return (
    <>
      <div className="header-component">
        <div className="header-left">
          <FaTshirt style={{ marginRight: 20, fontSize: 20 }} />
          CADASTRO DE PRODUTOS
        </div>
        <div>
          <Link to="/" className="link-to-home">
            <FaHome />
          </Link>
        </div>
      </div>

      <div className="content-page">
        <div className="grid-products-save">
          <div>
            <span className="label">Visualização do Card</span>
            <div className="card-product">
              {!photo ? (
                <div className="card-image-icon">
                  <FaImages
                    style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                  />
                </div>
              ) : (
                <img className="card-image" alt="Imagem" src={previewPhoto} />
              )}
              <div className="card-title">{title}</div>
              <div className="card-content">{description}</div>
              <div className="card-footer">
                <FaSearch style={{ marginRight: 15 }} />
                Veja Mais
              </div>
            </div>
          </div>
          <div>
            <span className="label">Visualização do Banner</span>
            {banner ? (
              <div className="remove-banner">
                <img
                  src={previewBanner}
                  alt="Banner"
                  style={{ width: "100%" }}
                />
                <div>
                  <button
                    type="button"
                    className="remove-banner-button"
                    onClick={() => removeBanner()}
                  >
                    <FaTimes style={{ color: "#fff", fontSize: 25 }} />
                    {banner.name}
                  </button>
                </div>
              </div>
            ) : (
              <label id="xmlFile">
                <input
                  type="file"
                  onChange={(event) => setBanner(event.target.files[0])}
                />
                <FaImages style={{ fontSize: 70, marginBottom: 20 }} />
                Clique aqui para adicionar um banner ao produto
              </label>
            )}
          </div>
        </div>
        <div className="container-info">
          <span className="title-container-info">
            <FaInfoCircle style={{ marginRight: 15 }} />
            INFORMAÇÕES DO PRODUTO
          </span>
          <div className="grid-products-info">
            {photo ? (
              <button
                className="remove-img"
                onClick={() => removePhoto()}
                type="button"
              >
                <FaTimes style={{ fontSize: 50, color: "#f44336" }} />
                <p>{photo.name}</p>
              </button>
            ) : (
              <label id="photoFile">
                <input
                  type="file"
                  onChange={(event) => setPhoto(event.target.files[0])}
                />
                <FaImages style={{ fontSize: 30, marginBottom: 20 }} />
                Clique aqui para adicionar a foto do produto
              </label>
            )}
            <div>
              <span className="label">
                Nome do Produto
                <span
                  style={{
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#777",
                    marginLeft: 15,
                    fontSize: 11,
                  }}
                >
                  Máx. 24 caracteres
                </span>
              </span>
              <input
                type="text"
                className="input-text"
                onChange={(e) => setTitle(e.target.value.toUpperCase())}
                value={title}
                maxLength={24}
              />
              <span className="label">
                Descrição do Produto
                <span
                  style={{
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#777",
                    marginLeft: 15,
                    fontSize: 11,
                  }}
                >
                  Máx. 250 caracteres
                </span>
              </span>
              <textarea
                type="text"
                className="text-area"
                style={{ height: 55 }}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                maxLength={250}
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
