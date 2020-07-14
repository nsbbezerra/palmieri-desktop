import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaTags,
  FaHome,
  FaInfoCircle,
  FaSave,
  FaTimes,
  FaImages,
  FaComments,
} from "react-icons/fa";
import api from "../configs/axios";
import Modal from "react-modal";
import Lottie from "react-lottie";

import successData from "../animations/success.json";
import errorData from "../animations/error.json";
import loadingData from "../animations/loading.json";

export default function ListDepoiment() {
  const [erroModal, setErroModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [messageErro, setErroMessage] = useState("");
  const [erroStatus, setErroStatus] = useState("");
  const [typeModal, setTypeModal] = useState("success");

  const [urlImage, setUrlImage] = useState("");
  const [depoiments, setDepoiments] = useState([]);

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
    setLoadingModal(true);
    await api
      .get("/depoiments")
      .then((response) => {
        setDepoiments(response.data.depoiments);
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

  async function removeComment(id) {
    setLoadingModal(true);
    await api
      .delete(`/depoiments/${id}`)
      .then((response) => {
        setLoadingModal(false);
        setErroStatus(response.data.message);
        setTypeModal("success");
        setErroModal(true);
        admin();
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
          <FaComments style={{ marginRight: 20, fontSize: 20 }} />
          LISTAGEM DE COMENTÁRIOS
        </div>
        <div>
          <Link to="/" className="link-to-home">
            <FaHome />
          </Link>
        </div>
      </div>

      <div className="content-page">
        <div className="grid-comments">
          {depoiments.length
            ? depoiments.map((dep) => (
                <div key={dep._id}>
                  <div className="depoiment-container">
                    <div className="depoiment-content">{dep.text}</div>
                    <img
                      className="depoiment-avatar"
                      alt="avatar"
                      src={`${urlImage}/${dep.avatar}`}
                    />
                    <span className="author">{dep.author}</span>
                  </div>
                  <div className="container-button-card-catalog">
                    <button
                      onClick={() => removeComment(dep._id)}
                      type="button"
                      className={"btn-red"}
                    >
                      <FaTimes />
                      <span className="btn-text">Remover</span>
                    </button>
                  </div>
                </div>
              ))
            : ""}
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
