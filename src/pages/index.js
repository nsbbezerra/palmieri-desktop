import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaBars,
  FaSave,
  FaTimes,
  FaTools,
  FaTags,
  FaTshirt,
  FaImages,
  FaComments,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Lottie from "react-lottie";
import animationData from "../animations/505.json";
import successData from "../animations/success.json";
import errorData from "../animations/error.json";

export default function Index() {
  const [modal, setModal] = useState(false);
  const [urlServer, setUrlServer] = useState("");
  const [port, setPort] = useState("");
  const [success, setSuccess] = useState(false);
  const [erro, setErro] = useState(false);

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

  useEffect(() => {
    admin();
  }, []);

  async function admin() {
    const urlServidor = await localStorage.getItem("url");
    const portaServidor = await localStorage.getItem("port");
    if (!urlServidor) {
      setModal(true);
    } else {
      setUrlServer(urlServidor);
      setPort(portaServidor);
    }
  }

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
        <div className="title-page">
          <FaBars style={{ marginRight: 20 }} />
          ACESSO RÁPIDO
        </div>

        <div className="grid-five">
          <Link to="/category" className="action-button">
            <FaTags className="action-button-icon" />
            CADASTRO DE CATEGORIAS
          </Link>
          <Link to="/product" className="action-button">
            <FaTshirt className="action-button-icon" />
            CADASTRO DE PRODUTOS
          </Link>
          <Link to="/catalog" className="action-button">
            <FaImages className="action-button-icon" />
            CADASTRO DE CATÁLOGO
          </Link>
          <Link to="/comments" className="action-button">
            <FaComments className="action-button-icon" />
            CADASTRO DE COMENTÁRIOS
          </Link>
        </div>

        <div className="grid-five">
          <Link to="/listCategory" className="action-button">
            <FaTags className="action-button-icon" />
            LISTAGEM DE CATEGORIAS
          </Link>
          <Link to="/listProduct" className="action-button">
            <FaTshirt className="action-button-icon" />
            LISTAGEM DE PRODUTOS
          </Link>
          <Link to="/listCatalog" className="action-button">
            <FaImages className="action-button-icon" />
            LISTAGEM DE CATÁLOGO
          </Link>
          <Link to="/listComments" className="action-button">
            <FaComments className="action-button-icon" />
            LISTAGEM DE COMENTÁRIOS
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
    </div>
  );
}
