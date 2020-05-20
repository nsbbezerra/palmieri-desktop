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
import Modal from "react-modal";
import Lottie from "react-lottie";
import successData from "../animations/success.json";
import errorData from "../animations/error.json";
import loadingData from "../animations/loading.json";
import api from "../configs/axios";

export default function SaveProducts() {
  const [title, setTitle] = useState("TÍTULO");
  const [description, setDescription] = useState("Descrição...");
  const [banner, setBanner] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [erroModal, setErroModal] = useState(false);
  const [messageErro, setErroMessage] = useState("");
  const [erroStatus, setErroStatus] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [disabledBanner, setDisabledBanner] = useState(true);

  function clearAll() {
    removeBanner();
    removePhoto();
    setTitle("TÍTULO");
    setDescription("Descrição...");
    setDisabledBanner(true);
  }

  const previewBanner = useMemo(() => {
    return banner ? URL.createObjectURL(banner) : null;
  }, [banner]);

  const previewPhoto = useMemo(() => {
    return photo ? URL.createObjectURL(photo) : null;
  }, [photo]);

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

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  async function removeBanner() {
    await URL.revokeObjectURL(banner);
    setBanner(null);
  }

  async function removePhoto() {
    await URL.revokeObjectURL(photo);
    setPhoto(null);
  }

  async function saveProduct() {
    if (title === "TÍTULO") {
      setErroStatus("Erro ao cadastrar o Produto");
      setErroMessage("Insira um título para o produto");
      setErroModal(true);
      return false;
    }
    if (description === "Descrição...") {
      setErroStatus("Erro ao cadastrar o Produto");
      setErroMessage("Insira uma descrição para o produto");
      setErroModal(true);
      return false;
    }
    if (photo === null) {
      setErroStatus("Erro ao cadastrar o Produto");
      setErroMessage("Não existe uma imagem para o produto");
      setErroModal(true);
      return false;
    }
    setLoading(true);
    let data = new FormData();
    data.append("name", title);
    data.append("description", description);
    data.append("image", photo);
    await api
      .post("/products", data)
      .then((response) => {
        setIdProduct(response.data.id);
        setLoading(false);
        setSuccessMessage(response.data.message);
        setSuccessModal(true);
        setDisabledBanner(false);
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          setErroStatus("Sem conexão com o servidor");
          setErroMessage(
            "Não foi possível estabelecer uma conexão com o servidor"
          );
          setErroModal(true);
          setLoading(false);
        } else {
          setErroStatus(error.response.data.erro.message);
          setErroMessage(error.response.data.erro.type);
          setErroModal(true);
          setLoading(false);
        }
      });
  }

  async function saveBanner() {
    if (banner === null) {
      setErroStatus("Erro ao cadastrar o Banner");
      setErroMessage("Não existe uma imagem para cadastro");
      setErroModal(true);
      return false;
    }
    setLoading(true);
    let data = new FormData();
    data.append("banner", banner);
    await api
      .put(`/banner/${idProduct}`, data)
      .then((response) => {
        setLoading(false);
        setSuccessMessage(response.data.message);
        setSuccessModal(true);
        clearAll();
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          setErroStatus("Sem conexão com o servidor");
          setErroMessage(
            "Não foi possível estabelecer uma conexão com o servidor"
          );
          setErroModal(true);
          setLoading(false);
        } else {
          setErroStatus(error.response.data.erro.message);
          setErroMessage(error.response.data.erro.type);
          setErroModal(true);
          setLoading(false);
        }
      });
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
            <button
              onClick={() => {
                saveProduct();
              }}
              type="button"
              className="btn-primary"
            >
              <span className="btn-label">
                <FaSave />
              </span>
              <span className="btn-text">Salvar Informações</span>
            </button>
            <button
              onClick={() => {
                saveBanner();
              }}
              type="button"
              className="btn-primary"
              disabled={disabledBanner}
            >
              <span className="btn-label">
                <FaImage />
              </span>
              <span className="btn-text">Salvar Banner do Produto</span>
            </button>
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
            <span>Cadastro de Produtos</span>
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
        isOpen={successModal}
        contentLabel="Rota para a API"
        onRequestClose={() => setSuccessModal(false)}
        className="modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="modal-container">
          <div className="modal-header">
            <span>Cadastro de Produtos</span>
            <button
              className="btn-close-modal"
              onClick={() => {
                setSuccessModal(false);
              }}
            >
              <FaTimes />
            </button>
          </div>
          <div className="modal-content">
            <Lottie options={successOptions} width={"40%"} />
            <p
              style={{
                fontWeight: "700",
                width: "100%",
                textAlign: "center",
                fontSize: 16,
                color: "#4caf50",
              }}
            >
              {successMessage}
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={loading}
        contentLabel="Rota para a API"
        className="modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="modal-container">
          <div className="modal-content">
            <Lottie options={loadingOptions} width={"50%"} />
            <p
              style={{
                fontWeight: "700",
                width: "100%",
                textAlign: "center",
                fontSize: 16,
                color: "#444",
              }}
            >
              Cadastrando Produto, Aguarde...
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
