import React, { useState, useEffect } from "react";
import {
  FaIdCardAlt,
  FaHome,
  FaInfoCircle,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Lottie from "react-lottie";
import successData from "../animations/success.json";
import errorData from "../animations/error.json";
import loadingData from "../animations/loading.json";
import api from "../configs/axios";

export default function ListPartners() {
  const [erroModal, setErroModal] = useState(false);
  const [messageErro, setErroMessage] = useState("");
  const [erroStatus, setErroStatus] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingFind, setLoadingFind] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [idPart, setIdPart] = useState("");
  const [partners, setPartners] = useState([]);

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

  useEffect(() => {
    admin();
  }, []);

  async function admin() {
    setLoadingFind(true);
    await api
      .get("/professional")
      .then((response) => {
        console.log(response);
        setPartners(response.data.partners);
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

  function handleRemove(id) {
    setIdPart(id);
    setModalConfirm(true);
  }

  async function removePartner() {
    setModalConfirm(false);
    setLoading(true);
    await api
      .delete(`/professional/${idPart}`)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setLoading(false);
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
          LISTAGEM DE FUNCIONÁRIOS
        </div>
        <div>
          <Link to="/" className="link-to-home">
            <FaHome />
          </Link>
        </div>
      </div>

      <div className="content-page">
        {partners.length ? (
          <div className="container-info">
            <span className="title-container-info">
              <FaInfoCircle style={{ marginRight: 15 }} />
              INFORMAÇÕES DOS FUNCIONÁRIOS
            </span>
            <table className="table-partners" cellSpacing="0">
              <thead>
                <tr>
                  <td>FUNCIONÁRIO</td>
                  <td>FUNÇÃO</td>
                  <td>AÇÕES</td>
                </tr>
              </thead>
              <tbody>
                {partners.map((part) => (
                  <tr key={part._id}>
                    <td>{part.name}</td>
                    <td>{part.func}</td>
                    <td>
                      <button
                        className="btn-circle"
                        onClick={() => handleRemove(part._id)}
                      >
                        <FaTimes />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ fontWeight: "600", fontSize: 18, color: "#444" }}>
            Nenhum funcionário cadastrado
          </p>
        )}
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
              Excluindo Funcionário, Aguarde...
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
      <Modal
        isOpen={modalConfirm}
        contentLabel="Rota para a API"
        className="modal"
        onRequestClose={() => setModalConfirm(false)}
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="modal-container">
          <div className="modal-header">
            <span>Gerenciador de Funcionário</span>
            <button
              className="btn-close-modal"
              onClick={() => {
                setModalConfirm(false);
              }}
            >
              <FaTimes />
            </button>
          </div>
          <div className="modal-content">
            <p
              style={{
                fontWeight: "700",
                width: "100%",
                textAlign: "center",
                fontSize: 16,
                color: "#444",
              }}
            >
              Pretende excluir este funcionário?
            </p>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => setModalConfirm(false)}
              type="button"
              className="btn-primary btn-small btn-erro"
            >
              <span className="btn-label btn-label-small btn-erro-label">
                <FaTimes />
              </span>
              <span className="btn-text">Não</span>
            </button>

            <button
              onClick={() => removePartner()}
              type="button"
              className="btn-primary btn-small btn-success"
            >
              <span className="btn-label btn-label-small btn-success-label">
                <FaCheck />
              </span>
              <span className="btn-text">Sim</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
