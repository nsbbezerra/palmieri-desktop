import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaTags,
  FaHome,
  FaInfoCircle,
  FaSave,
  FaTimes,
  FaImages,
} from "react-icons/fa";

export default function Category() {
  const [name, setName] = useState("CATEGORIA");
  const [imgAlt, setImgAlt] = useState("");
  const [photo, setPhoto] = useState(null);

  const previewPhoto = useMemo(() => {
    return photo ? URL.createObjectURL(photo) : null;
  }, [photo]);

  async function removePhoto() {
    await URL.revokeObjectURL(photo);
    setPhoto(null);
  }

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
              {photo ? (
                <>
                  <img
                    alt="card category"
                    src={previewPhoto}
                    className="card-category-img"
                  />
                  <button
                    onClick={() => removePhoto()}
                    className="remove-photo"
                  >
                    <FaTimes />
                  </button>
                </>
              ) : (
                <>
                  <label id="xmlFile">
                    <input
                      type="file"
                      onChange={(event) => setPhoto(event.target.files[0])}
                    />
                    <FaImages style={{ fontSize: 50, marginBottom: 20 }} />
                    Clique aqui para adicionar uma imagem ao produto
                  </label>
                </>
              )}
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
              <span className="label">
                Nome da Categoria
                <span className="label-info">Máx. 23 caracteres</span>
              </span>
              <input
                type="text"
                className="input-text"
                onChange={(e) => setName(e.target.value.toUpperCase())}
                value={name}
                maxLength={23}
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
