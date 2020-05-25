import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaTshirt,
  FaIdCardAlt,
  FaImages,
  FaBars,
  FaPager,
  FaRocketchat,
  FaSave,
  FaTimes,
  FaTools,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Lottie from "react-lottie";
import animationData from "../animations/505.json";
import successData from "../animations/success.json";
import errorData from "../animations/error.json";
import loadingData from "../animations/loading.json";
import api from "../configs/axios";

export default function Index() {
  const [modal, setModal] = useState(false);
  const [urlServer, setUrlServer] = useState("");
  const [port, setPort] = useState("");
  const [success, setSuccess] = useState(false);
  const [erro, setErro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erroModal, setErroModal] = useState(false);
  const [messageErro, setErroMessage] = useState("");
  const [erroStatus, setErroStatus] = useState("");
  const [products, setProducts] = useState(0);
  const [partners, setPartners] = useState(0);
  const [portifolio, setPortifolio] = useState(0);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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

  async function admin() {
    const urlServidor = await localStorage.getItem("url");
    const portaServidor = await localStorage.getItem("port");
    if (!urlServidor) {
      setModal(true);
    } else {
      setUrlServer(urlServidor);
      setPort(portaServidor);
      finder();
    }
  }

  async function finder() {
    setLoading(true);
    await api
      .get("/dashboard")
      .then((response) => {
        setProducts(response.data.products);
        setPartners(response.data.partners);
        setPortifolio(response.data.portifilio);
        setLoading(false);
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

  useEffect(() => {
    admin();
  }, []);

  async function saveRoute() {
    await localStorage.setItem("url", urlServer);
    await localStorage.setItem("port", port);
    setSuccess(true);
  }

  async function handleCloseModal() {
    const urlServidor = await localStorage.getItem("url");
    const portaServidor = await localStorage.getItem("port");
    if (urlServidor || portaServidor) {
      setModal(false);
    }
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <div className="header-component">
        <div className="header-left">
          <FaHome style={{ marginRight: 20, fontSize: 20 }} />
          INÍCIO
        </div>
        <div>
          <Link to="/system" className="link-to-home">
            <FaTools />
          </Link>
        </div>
      </div>
      <div className="content-page">
        <div className="grid-cards">
          <div className="card">
            <div className="card-row">
              <FaTshirt
                className="icon-card"
                style={{ marginRight: loading === true ? "25px" : "" }}
              />
              <p>PRODUTOS CADASTRADOS</p>
              {loading === false ? (
                <span className="count">{products}</span>
              ) : (
                <Lottie
                  options={loadingOptions}
                  width={"70px"}
                  height={"70px"}
                />
              )}
            </div>
          </div>
          <div className="card">
            <div className="card-row">
              <FaIdCardAlt
                className="icon-card"
                style={{ marginRight: loading === true ? "25px" : "" }}
              />
              FUNCIONÁRIOS CADASTRADOS
              {loading === false ? (
                <span className="count">{partners}</span>
              ) : (
                <Lottie
                  options={loadingOptions}
                  width={"70px"}
                  height={"70px"}
                />
              )}
            </div>
          </div>
          <div className="card">
            <div className="card-row">
              <FaImages
                className="icon-card"
                style={{ marginRight: loading === true ? "25px" : "" }}
              />
              CATÁLOGOS CADASTRADOS
              {loading === false ? (
                <span className="count">{portifolio}</span>
              ) : (
                <Lottie
                  options={loadingOptions}
                  width={"70px"}
                  height={"70px"}
                />
              )}
            </div>
          </div>
        </div>

        <div className="title-page">
          <FaBars style={{ marginRight: 20 }} />
          ACESSO RÁPIDO
        </div>

        <div className="grid-five">
          <Link to="/saveProducts" className="action-button">
            <FaTshirt className="action-button-icon" />
            CADASTRO DE PRODUTOS
          </Link>
          <Link to="/savePages" className="action-button">
            <FaPager className="action-button-icon" />
            CADASTRO DE PÁGINAS
          </Link>
          <Link to="/savePartners" className="action-button">
            <FaIdCardAlt className="action-button-icon" />
            CADASTRO DE FUNCIONÁRIOS
          </Link>
          <Link to="/saveCatalog" className="action-button">
            <FaImages className="action-button-icon" />
            CADASTRO DE CATÁLOGOS
          </Link>
          <Link to="/saveDepoiment" className="action-button">
            <FaRocketchat className="action-button-icon" />
            CADASTRO DE DEPOIMENTOS
          </Link>
        </div>

        <div className="grid-five">
          <Link to="/listProducts" className="action-button">
            <FaTshirt className="action-button-icon" />
            LISTAGEM DE PRODUTOS
          </Link>
          <Link to="/listPartners" className="action-button">
            <FaIdCardAlt className="action-button-icon" />
            LISTAGEM DE FUNCIONÁRIOS
          </Link>
        </div>
      </div>

      <Modal
        isOpen={modal}
        contentLabel="Rota para a API"
        onRequestClose={() => setModal(false)}
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
                handleCloseModal();
              }}
            >
              <FaTimes />
            </button>
          </div>
          <div className="modal-content">
            {success === true || erro === true ? (
              <>
                {success === true && (
                  <>
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
                      Rota Salva com Sucesso!
                    </p>
                  </>
                )}
                {erro === true && (
                  <>
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
                      Ocorreu um Erro ao Guardar a Rota!
                    </p>
                  </>
                )}
              </>
            ) : (
              <>
                <Lottie options={defaultOptions} width={"40%"} />
                <p
                  style={{
                    fontWeight: "700",
                    width: "100%",
                    textAlign: "center",
                    fontSize: 16,
                    color: "#f44336",
                  }}
                >
                  Não foi encontrado uma rota de conexão com o servidor,
                  configure-a abaixo!
                </p>
              </>
            )}
            <div className="content-modal-inputs">
              <div style={{ width: "80%" }}>
                <span className="label">URL do Servidor</span>
                <input
                  type="text"
                  className="input-text"
                  onChange={(e) => setUrlServer(e.target.value)}
                  value={urlServer}
                />
              </div>
              <div style={{ width: "18%" }}>
                <span className="label">Porta</span>
                <input
                  type="text"
                  className="input-text"
                  onChange={(e) => setPort(e.target.value)}
                  value={port}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => saveRoute()}
              type="button"
              className="btn-primary btn-small"
            >
              <span className="btn-label btn-label-small">
                <FaSave />
              </span>
              <span className="btn-text">Salvar</span>
            </button>
          </div>
        </div>
      </Modal>

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
    </div>
  );
}
