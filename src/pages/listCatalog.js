import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaImages,
  FaHome,
  FaTshirt,
  FaLock,
  FaLockOpen,
  FaTimes,
} from "react-icons/fa";
import Select from "react-select";
import api from "../configs/axios";
import Modal from "react-modal";
import Lottie from "react-lottie";

import successData from "../animations/success.json";
import errorData from "../animations/error.json";
import loadingData from "../animations/loading.json";

export default function ListCatalog() {
  const [products, setProducts] = useState([]);

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState({});
  const [urlImage, setUrlImage] = useState("");

  const [erroModal, setErroModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [messageErro, setErroMessage] = useState("");
  const [erroStatus, setErroStatus] = useState("");
  const [typeModal, setTypeModal] = useState("success");

  const [catalogs, setCatalogs] = useState([]);

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

  function handleSearch(value) {
    setProductId(value.value);
    setProductName(value);
    findCatalogs(value.value);
  }

  async function findCatalogs(id) {
    setLoadingModal(true);
    await api
      .get(`/catalog/${id}`)
      .then((response) => {
        setCatalogs(response.data.catalog);
        setUrlImage(response.data.urlImage);
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

  async function lockItem(value) {
    setLoadingModal(true);
    await api
      .put(`/catalog/${value._id}`, {
        active: !value.active,
      })
      .then((response) => {
        setLoadingModal(false);
        setErroStatus(response.data.message);
        setTypeModal("success");
        setErroModal(true);
        findCatalogs(value.product);
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
          LISTAGEM DE CATÁLOGO
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
              onChange={(value) => handleSearch(value)}
              noOptionsMessage={() => <p>Nenhum produto Cadastrado</p>}
              styles={colorStyles}
            />
          </div>
        </div>
        <div className="grid-list-category">
          {catalogs.map((cat) => (
            <div className="container-card-list" key={cat._id}>
              <div
                className={`card-category ${
                  cat.active === false ? "disable" : ""
                }`}
              >
                <div className="container-img-card-category">
                  <img
                    alt="card category"
                    src={`${urlImage}/${cat.image}`}
                    className="card-category-img"
                  />
                </div>
              </div>
              <div className="container-button-card-catalog">
                <button
                  onClick={() => lockItem(cat)}
                  type="button"
                  className={cat.active === true ? "btn-red" : "btn-green"}
                >
                  {cat.active === true ? <FaLock /> : <FaLockOpen />}
                  <span className="btn-text">
                    {cat.active === true ? "Bloquear" : "Ativar"}
                  </span>
                </button>
              </div>
            </div>
          ))}
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
