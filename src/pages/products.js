import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaTshirt,
  FaSave,
  FaInfoCircle,
  FaTags,
  FaImages,
  FaTimes,
} from "react-icons/fa";
import Select from "react-select";

export default function Products() {
  const [name, setName] = useState("CATEGORIA");
  const [description, setDescription] = useState("DESCRIÇÃO");
  const [imgAlt, setImgAlt] = useState("");
  const [slug, setSlug] = useState("");
  const [products, setProducts] = useState([]);
  const [video, setVideo] = useState("");
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
        <div className="products-grid-save">
          <div>
            <span className="label">CARD</span>
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
              <span className="title-card-product">{name}</span>
              <span className="link-card-product">{description}</span>
            </div>
          </div>

          <div>
            <span className="label">VÍDEO</span>
            <iframe
              className="video-youtube"
              src={video}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="container-info">
          <span className="title-container-info">
            <FaInfoCircle style={{ marginRight: 15 }} />
            INFORMAÇÕES DO PRODUTO
          </span>
          <div className="grid-product-inputs">
            <div>
              <span className="label">
                Nome do Produto
                <span className="label-info">Máx. 28 caracteres</span>
              </span>
              <input
                type="text"
                className="input-text"
                onChange={(e) => setName(e.target.value.toUpperCase())}
                value={name}
                maxLength={28}
              />
            </div>
            <div>
              <span className="label">
                Descrição do Produto
                <span className="label-info">Máx. 30 caracteres</span>
              </span>
              <input
                type="text"
                className="input-text"
                onChange={(e) => setDescription(e.target.value.toUpperCase())}
                value={description}
                maxLength={30}
              />
            </div>
            <div>
              <span className="label">Vídeo para o Produto</span>
              <input
                type="text"
                className="input-text"
                onChange={(e) => setVideo(e.target.value)}
                value={video}
              />
            </div>
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
          <div>
            <span className="label">Slug para o Produto</span>
            <textarea
              type="text"
              className="text-area"
              onChange={(e) => setSlug(e.target.value)}
              value={slug}
              rows={5}
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
