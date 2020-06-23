import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaTools,
  FaServer,
  FaInfoCircle,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Lottie from "react-lottie";
import successData from "../animations/success.json";

export default function System() {
  const [port, setPort] = useState("");
  const [urlServer, setUrlServer] = useState("");
  const [success, setSuccess] = useState(false);

  const successOptions = {
    loop: false,
    autoplay: true,
    animationData: successData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  async function admin() {
    const portServer = await localStorage.getItem("port");
    const urlServidor = await localStorage.getItem("url");

    if (portServer || urlServidor) {
      setPort(portServer);
      setUrlServer(urlServidor);
    }
  }

  useEffect(() => {
    admin();
  }, []);

  async function saveRoute() {
    await localStorage.setItem("url", urlServer);
    await localStorage.setItem("port", port);
    setSuccess(true);
  }

  return (
    <>
      <div className="header-component">
        <div className="header-left">
          <FaTools style={{ marginRight: 20, fontSize: 20 }} />
          CONFIGURAÇÕES DO SISTEMA
        </div>
        <div>
          <Link to="/" className="link-to-home">
            <FaHome />
          </Link>
        </div>
      </div>

      <div className="content-page">
        <div className="title-page">
          <div className="header-left">
            <FaServer style={{ marginRight: 20 }} />
            ROTA PARA SERVIDOR
          </div>
        </div>
        <div className="container-info">
          <span className="title-container-info">
            <FaInfoCircle style={{ marginRight: 15 }} />
            INFORMAÇÕES DA ROTA
          </span>
          <div className="grid-route">
            <div>
              <span className="label">URL do Servidor</span>
              <input
                type="text"
                className="input-text"
                onChange={(e) => setUrlServer(e.target.value)}
                value={urlServer}
              />
            </div>
            <div>
              <span className="label">Porta</span>
              <input
                type="text"
                className="input-text"
                onChange={(e) => setPort(e.target.value)}
                value={port}
              />
            </div>
            <div>
              <span className="label" style={{ color: "#222" }}>
                Porta
              </span>
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
        </div>

        <Modal
          isOpen={success}
          contentLabel="Rota para a API"
          onRequestClose={() => setSuccess(false)}
          className="modal"
          overlayClassName="overlay"
        >
          <div className="modal-container">
            <div className="modal-header">
              <span>Conexão com Servidor</span>
              <button
                className="btn-close-modal"
                onClick={() => {
                  setSuccess(false);
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
                Rota Salva com Sucesso! Reinicie a aplicação.
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
