import React, { useState, useMemo, useEffect } from "react";
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
import api from "../configs/axios";
import Modal from "react-modal";
import Lottie from "react-lottie";

import successData from "../animations/success.json";
import errorData from "../animations/error.json";
import loadingData from "../animations/loading.json";

export default function Catalog() {
  const [imgAlt, setImgAlt] = useState("");
  const [products, setProducts] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState({});

  const [erroModal, setErroModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [messageErro, setErroMessage] = useState("");
  const [erroStatus, setErroStatus] = useState("");
  const [typeModal, setTypeModal] = useState("success");

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

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const colorStyles = {
    option: (styles) => ({ ...styles, color: "#444" }),
  };

  useEffect(() => {
    admin();
  }, []);

  async function admin() {
    setLoadingModal(true);
    await api
      .get("/findProducts")
      .then((response) => {
        setProducts(response.data.products);
        setLoadingModal(false);
      })
      .catch((error) => {
        setLoadingModal(false);
        if (error.message === "Network Error") {
          setErroMessage("Sem conexão com o servidor");
          setErroStatus("Erro de conexão");
          setTypeModal("erro");
          setErroModal(true);
          return false;
        }
        setErroMessage(error.response.data.message.message);
        setErroStatus(error.response.data.message.type);
        setTypeModal("erro");
        setErroModal(true);
      });
  }

  function handleProduct(id) {
    setProductId(id.value);
    setProductName(id);
  }

  async function saveCatalog() {
    if (productId === "") {
      setErroMessage("Escolha um produto para o catálogo");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    if (imgAlt === "") {
      setErroMessage("Escolha uma descrição para a imagem");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    if (photo === null) {
      setErroMessage("Escolha uma imagem para o catálogo");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    setLoadingModal(true);
    let data = new FormData();
    data.append("product", productId);
    data.append("imageDescription", imgAlt);
    data.append("catalog", photo);
    await api
      .post("/catalog", data)
      .then((response) => {
        setLoadingModal(false);
        setErroStatus(response.data.message);
        setTypeModal("success");
        setErroModal(true);
        setProductName({});
        setProductId("");
        setPhoto(null);
        setImgAlt("");
        removePhoto();
      })
      .catch((error) => {
        setLoadingModal(false);
        if (error.message === "Network Error") {
          setErroMessage("Sem conexão com o servidor");
          setErroStatus("Erro de conexão");
          setTypeModal("erro");
          setErroModal(true);
          return false;
        }
        setErroMessage(error.response.data.message.message);
        setErroStatus(error.response.data.message.type);
        setTypeModal("erro");
        setErroModal(true);
      });
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
              value={productName}
              placeholder="Selecione o Produto"
              onChange={(value) => handleProduct(value)}
              noOptionsMessage={() => <p>Nenhum produto cadastrado</p>}
              styles={colorStyles}
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
            <button
              onClick={() => saveCatalog()}
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
            <span>Informação</span>
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
            <Lottie
              options={typeModal === "erro" ? errorOptions : successOptions}
              width={"40%"}
            />
            {typeModal === "erro" ? (
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
            ) : (
              <p
                style={{
                  fontWeight: "700",
                  width: "100%",
                  textAlign: "center",
                  fontSize: 16,
                  color: "#4caf50",
                }}
              >
                {erroStatus}
              </p>
            )}
            {typeModal === "erro" && (
              <p
                style={{
                  fontWeight: "400",
                  width: "100%",
                  textAlign: "center",
                  fontSize: 14,
                  color: "#ddd",
                }}
              >
                <strong>Erro:</strong> {messageErro}
              </p>
            )}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={loadingModal}
        contentLabel="Rota para a API"
        className="modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <Lottie options={loadingOptions} width={"80%"} />
      </Modal>
    </>
  );
}
