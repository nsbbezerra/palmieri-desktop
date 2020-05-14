import React, { useState, useMemo } from "react";
import {
  FaHome,
  FaImages,
  FaTshirt,
  FaSave,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Select from "react-select";

export default function SaveCatalog() {
  const [imageCatalog, setImageCatalog] = useState(null);

  const previewImage = useMemo(() => {
    return imageCatalog ? URL.createObjectURL(imageCatalog) : null;
  }, [imageCatalog]);

  async function removeImage() {
    await URL.revokeObjectURL(imageCatalog);
    setImageCatalog(null);
  }

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <>
      <div className="header-component">
        <div className="header-left">
          <FaImages style={{ marginRight: 20, fontSize: 20 }} />
          CADASTRO DE CATÁLOGOS
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
        <div className="container-catalog">
          <div className="card-product" style={{ marginBottom: "20px" }}>
            {!imageCatalog ? (
              <div className="card-image-icon">
                <FaImages
                  style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                />
              </div>
            ) : (
              <img className="card-image" alt="Imagem" src={previewImage} />
            )}
          </div>
          <div className="card-product" style={{ marginBottom: "20px" }}>
            {!imageCatalog ? (
              <div className="card-image-icon">
                <FaImages
                  style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                />
              </div>
            ) : (
              <img className="card-image" alt="Imagem" src={previewImage} />
            )}
          </div>
          <div className="card-product" style={{ marginBottom: "20px" }}>
            {!imageCatalog ? (
              <div className="card-image-icon">
                <FaImages
                  style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                />
              </div>
            ) : (
              <img className="card-image" alt="Imagem" src={previewImage} />
            )}
          </div>
          <div className="card-product" style={{ marginBottom: "20px" }}>
            {!imageCatalog ? (
              <div className="card-image-icon">
                <FaImages
                  style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                />
              </div>
            ) : (
              <img className="card-image" alt="Imagem" src={previewImage} />
            )}
          </div>
          <div className="card-product" style={{ marginBottom: "20px" }}>
            {!imageCatalog ? (
              <div className="card-image-icon">
                <FaImages
                  style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                />
              </div>
            ) : (
              <img className="card-image" alt="Imagem" src={previewImage} />
            )}
          </div>
          <div className="card-product" style={{ marginBottom: "20px" }}>
            {!imageCatalog ? (
              <div className="card-image-icon">
                <FaImages
                  style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                />
              </div>
            ) : (
              <img className="card-image" alt="Imagem" src={previewImage} />
            )}
          </div>
          <div className="card-product" style={{ marginBottom: "20px" }}>
            {!imageCatalog ? (
              <div className="card-image-icon">
                <FaImages
                  style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                />
              </div>
            ) : (
              <img className="card-image" alt="Imagem" src={previewImage} />
            )}
          </div>
        </div>
        <div className="container-info">
          <span className="title-container-info">
            <FaInfoCircle style={{ marginRight: 15 }} />
            INFORMAÇÕES DO PRODUTO
          </span>
          <div style={{ marginTop: "10px" }}>
            {imageCatalog ? (
              <button
                className="remove-img"
                onClick={() => removeImage()}
                type="button"
              >
                <FaTimes style={{ fontSize: 50, color: "#f44336" }} />
                <p>{imageCatalog.name}</p>
              </button>
            ) : (
              <label id="photoFile">
                <input
                  type="file"
                  onChange={(event) => setImageCatalog(event.target.files[0])}
                />
                <FaImages style={{ fontSize: 30, marginBottom: 20 }} />
                Clique aqui para adicionar uma foto do catálogo
              </label>
            )}
            <button
              onClick={() => {}}
              type="button"
              className="btn-primary"
              style={{ marginTop: 10 }}
            >
              <span className="btn-label">
                <FaSave />
              </span>
              <span className="btn-text">Salvar Catálogo</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
