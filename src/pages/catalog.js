import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaTshirt,
  FaSave,
  FaInfoCircle,
  FaImages,
  FaTimes,
} from "react-icons/fa";
import Select from "react-select";

export default function Catalog() {
  const [imgAlt, setImgAlt] = useState("");
  const [products, setProducts] = useState([]);
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
          <FaImages style={{ marginRight: 20, fontSize: 20 }} />
          CADASTRO DE CATÁLOGO
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
              noOptionsMessage={() => <p>Nenhum produto cadastrado</p>}
            />
          </div>
        </div>
        <div className="center-card">
          <div className="card-category">
            <div className="container-img-card-category">
              {photo ? (
                <>
                  <img
                    alt="card category"
                    src={previewPhoto}
                    className="card-catalog-img"
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
          </div>
        </div>

        <div className="container-info">
          <span className="title-container-info">
            <FaInfoCircle style={{ marginRight: 15 }} />
            INFORMAÇÕES DO CATÁLOGO
          </span>
          <div>
            <span className="label">Descrição para a Imagem</span>
            <input
              type="text"
              className="input-text"
              onChange={(e) => setImgAlt(e.target.value)}
              value={imgAlt}
            />
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
