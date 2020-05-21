import React, { useState, useMemo, useEffect } from "react";
import {
  FaHome,
  FaIdCardAlt,
  FaImages,
  FaInfoCircle,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Lottie from "react-lottie";
import successData from "../animations/success.json";
import errorData from "../animations/error.json";
import loadingData from "../animations/loading.json";
import api from "../configs/axios";

export default function SavePartners() {
  const [imageFunc, setImageFunc] = useState(null);
  const [name, setName] = useState("NOME");
  const [func, setFunct] = useState("Função...");
  const [partners, setPartners] = useState([]);
  const [erroModal, setErroModal] = useState(false);
  const [messageErro, setErroMessage] = useState("");
  const [erroStatus, setErroStatus] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingFind, setLoadingFind] = useState(false);
  const [urlPhoto, setUrlPhoto] = useState("");

  function clearAll() {
    removeImageFunc();
    setName("NOME");
    setFunct("Função...");
  }

  const previewImage = useMemo(() => {
    return imageFunc ? URL.createObjectURL(imageFunc) : null;
  }, [imageFunc]);

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

  async function removeImageFunc() {
    await URL.revokeObjectURL(imageFunc);
    setImageFunc(null);
  }

  async function admin() {
    setLoadingFind(true);
    await api
      .get("/professional")
      .then((response) => {
        setPartners(response.data.partners);
        setUrlPhoto(response.data.urlPhoto);
        setLoadingFind(false);
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          setErroStatus("Sem conexão com o servidor");
          setErroMessage(
            "Não foi possível estabelecer uma conexão com o servidor"
          );
          setErroModal(true);
          setLoadingFind(false);
        } else {
          setErroStatus(error.response.data.erro.message);
          setErroMessage(error.response.data.erro.type);
          setErroModal(true);
          setLoadingFind(false);
        }
      });
  }

  useEffect(() => {
    admin();
  }, []);

  async function savePartner() {
    if (name === "NOME") {
      setErroStatus("Erro ao cadastrar o Funcionário");
      setErroMessage("Insira um nome para o funcionário");
      setErroModal(true);
      return false;
    }
    if (func === "Função...") {
      setErroStatus("Erro ao cadastrar o Funcionário");
      setErroMessage("Insira uma função para o funcionário");
      setErroModal(true);
      return false;
    }
    if (imageFunc === null) {
      setErroStatus("Erro ao cadastrar o Funcionário");
      setErroMessage("Insira uma foto para o funcionário");
      setErroModal(true);
      return false;
    }
    setLoading(true);
    let data = new FormData();
    data.append("name", name);
    data.append("func", func);
    data.append("avatar", imageFunc);
    await api
      .post("/professional", data)
      .then((response) => {
        setLoading(false);
        clearAll();
        setSuccessMessage(response.data.message);
        setSuccessModal(true);
        admin();
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
          <FaIdCardAlt style={{ marginRight: 20, fontSize: 20 }} />
          CADASTRO DE FUNCIONÁRIOS
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
              {!imageFunc ? (
                <div className="card-image-icon">
                  <FaImages
                    style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                  />
                </div>
              ) : (
                <img className="card-image" alt="Imagem" src={previewImage} />
              )}
              <div className="card-title">{name}</div>
              <div className="card-content-func">{func}</div>
            </div>
          </div>
          <div className="container-info">
            <span className="title-container-info">
              <FaInfoCircle style={{ marginRight: 15 }} />
              INFORMAÇÕES DO FUNCIONÁRIO
            </span>
            <div className="grid-products-info">
              {imageFunc ? (
                <button
                  className="remove-img"
                  onClick={() => removeImageFunc()}
                  type="button"
                >
                  <FaTimes style={{ fontSize: 50, color: "#f44336" }} />
                  <p>{imageFunc.name}</p>
                </button>
              ) : (
                <label id="photoFile">
                  <input
                    type="file"
                    onChange={(event) => setImageFunc(event.target.files[0])}
                  />
                  <FaImages style={{ fontSize: 30, marginBottom: 20 }} />
                  Clique aqui para adicionar a foto do funcionário
                </label>
              )}
              <div>
                <div>
                  <span className="label">
                    Nome do Funcionário
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
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                    value={name}
                    maxLength={24}
                  />
                  <span className="label">
                    Função
                    <span
                      style={{
                        fontWeight: 400,
                        fontStyle: "italic",
                        color: "#777",
                        marginLeft: 15,
                        fontSize: 11,
                      }}
                    >
                      Máx. 35 caracteres
                    </span>
                  </span>
                  <input
                    type="text"
                    className="input-text"
                    onChange={(e) => setFunct(e.target.value)}
                    value={func}
                    maxLength={35}
                  />
                </div>
              </div>
            </div>
            <hr className="divider" />
            <div className="container-buttons">
              <button
                onClick={() => savePartner()}
                type="button"
                className="btn-primary"
              >
                <span className="btn-label">
                  <FaSave />
                </span>
                <span className="btn-text">Cadastrar Funcionário</span>
              </button>
            </div>
          </div>
        </div>

        <div className="cards-row">
          {partners.length ? (
            <>
              {partners.map((part) => (
                <div
                  className="card-product"
                  style={{ marginRight: "15px" }}
                  key={part._id}
                >
                  <img
                    className="card-image"
                    alt="Imagem"
                    src={`${urlPhoto}/${part.avatar}`}
                  />
                  <div className="card-title">{part.name}</div>
                  <div className="card-content-func">{part.func}</div>
                </div>
              ))}
            </>
          ) : (
            ""
          )}
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
            <span>Cadastro de Funcionário</span>
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
            <span>Cadastro de Funcionário</span>
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
              Cadastrando Funcionário, Aguarde...
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={loadingFind}
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
              Buscando Informações, Aguarde...
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
