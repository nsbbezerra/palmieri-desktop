import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaTshirt,
  FaHome,
  FaLockOpen,
  FaEdit,
  FaTags,
  FaLock,
  FaTimes,
  FaImages,
  FaInfoCircle,
  FaSave,
} from "react-icons/fa";
import Select from "react-select";
import Modal from "react-modal";
import Lottie from "react-lottie";

import successData from "../animations/success.json";
import errorData from "../animations/error.json";
import tshirt from "../assets/camisa-one-web.png";

export default function ListProduct() {
  const [products, setProducts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [erro, setErro] = useState(false);
  const [erroModal, setErroModal] = useState(false);
  const [messageErro, setErroMessage] = useState("");
  const [erroStatus, setErroStatus] = useState("");
  const [modal, setModal] = useState(true);

  const [name, setName] = useState("CATEGORIA");
  const [description, setDescription] = useState("DESCRIÇÃO");
  const [imgAlt, setImgAlt] = useState("");
  const [slug, setSlug] = useState("");
  const [video, setVideo] = useState("");
  const [photo, setPhoto] = useState(null);

  const previewPhoto = useMemo(() => {
    return photo ? URL.createObjectURL(photo) : null;
  }, [photo]);

  async function removePhoto() {
    await URL.revokeObjectURL(photo);
    setPhoto(null);
  }

  const successOptions = {
    loop: false,
    autoplay: true,
    animationData: successData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const errorOptions = {
    loop: false,
    autoplay: true,
    animationData: errorData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <div className="header-component">
        <div className="header-left">
          <FaTshirt style={{ marginRight: 20, fontSize: 20 }} />
          LISTAGEM DE PRODUTOS
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
        <div className="grid-list-product">
          <div className="container-card-list">
            <div className="card-product">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
              <span className="title-card-product">CAMISETA ESPORTIVA</span>
              <span className="link-card-product">DESCRIÇÃO</span>
            </div>
            <div className="container-button-card">
              <button onClick={() => {}} type="button" className="btn-blue">
                <FaEdit />
                <span className="btn-text">Editar</span>
              </button>
              <button onClick={() => {}} type="button" className="btn-red">
                <FaLock />
                <span className="btn-text">Bloquear</span>
              </button>
            </div>
          </div>
          <div className="container-card-list">
            <div className="card-product disable">
              <div className="container-img-card-category">
                <img
                  alt="card category"
                  src={tshirt}
                  className="card-category-img"
                />
              </div>
              <span className="title-card-product">CAMISETA ESPORTIVA</span>
              <span className="link-card-product">DESCRIÇÃO</span>
            </div>
            <div className="container-button-card">
              <button onClick={() => {}} type="button" className="btn-blue">
                <FaEdit />
                <span className="btn-text">Editar</span>
              </button>
              <button onClick={() => {}} type="button" className="btn-green">
                <FaLockOpen />
                <span className="btn-text">Ativar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={erroModal}
        contentLabel="Rota para a API"
        onRequestClose={() => setErroModal(false)}
        className="modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="modal-container">
          <div className="modal-header">
            <span>Conexão com Servidor</span>
            <button
              className="btn-close-modal"
              onClick={() => {
                setErroModal(false);
              }}
            >
              <FaTimes />
            </button>
          </div>
          <div className="modal-content">
            <Lottie options={errorOptions} width={"40%"} />
            <p
              style={{
                fontWeight: "700",
                width: "100%",
                textAlign: "center",
                fontSize: 16,
                color: "#f44336",
              }}
            >
              {erroStatus}
            </p>
            <p
              style={{
                fontWeight: "400",
                width: "100%",
                textAlign: "center",
                fontSize: 14,
                color: "#333",
              }}
            >
              <strong>Erro:</strong> {messageErro}
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modal}
        contentLabel="Rota para a API"
        onRequestClose={() => setModal(false)}
        className="modal-edit"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="modal-container">
          <div className="modal-header">
            <span>Editar Categoria</span>
            <button
              className="btn-close-modal"
              onClick={() => {
                setModal(false);
              }}
            >
              <FaTimes />
            </button>
          </div>
          <div className="modal-content">
            <div className="container-modal-card">
              <div>
                <span className="label">CARD ATUAL</span>
                <div className="card-product">
                  <div className="container-img-card-category">
                    <img
                      alt="card category"
                      src={previewPhoto}
                      className="card-product-img"
                    />
                  </div>
                  <span className="title-card-product">{name}</span>
                  <span className="link-card-product">{description}</span>
                </div>
              </div>
              <div>
                <span className="label">NOVO CARD</span>
                <div className="card-product">
                  <div className="container-img-card-category">
                    {photo ? (
                      <>
                        <img
                          alt="card category"
                          src={previewPhoto}
                          className="card-product-img"
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
                            onChange={(event) =>
                              setPhoto(event.target.files[0])
                            }
                          />
                          <FaImages
                            style={{ fontSize: 50, marginBottom: 20 }}
                          />
                          Clique aqui para adicionar uma imagem ao produto
                        </label>
                      </>
                    )}
                  </div>
                  <span className="title-card-product">{name}</span>
                  <span className="link-card-product">{description}</span>
                </div>
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
                    onChange={(e) =>
                      setDescription(e.target.value.toUpperCase())
                    }
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
                <button
                  onClick={() => {}}
                  type="button"
                  className="btn-primary"
                >
                  <span className="btn-label">
                    <FaSave />
                  </span>
                  <span className="btn-text">Salvar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
