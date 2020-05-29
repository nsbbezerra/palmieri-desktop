import React, { useState, useMemo } from "react";
import {
  FaHome,
  FaImages,
  FaTimes,
  FaSave,
  FaVideo,
  FaInfoCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Lottie from "react-lottie";
import successData from "../animations/success.json";
import errorData from "../animations/error.json";
import loadingData from "../animations/loading.json";
import api from "../configs/axios";

export default function SaveHome() {
  const [banner, setBanner] = useState(null);
  const [erroModal, setErroModal] = useState(false);
  const [messageErro, setErroMessage] = useState("");
  const [erroStatus, setErroStatus] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState("");

  const previewBanner = useMemo(() => {
    return banner ? URL.createObjectURL(banner) : null;
  }, [banner]);

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

  async function saveHome() {
    if (banner === null) {
      setErroStatus("Erro ao cadastrar as informações da página");
      setErroMessage("Não existe um banner para a página inicial");
      setErroModal(true);
      return false;
    }
    setLoading(true);
    let data = new FormData();
    data.append("banner", banner);
    data.append("video", video);
    await api
      .post("/home", data)
      .then((response) => {
        setLoading(false);
        setSuccessMessage(response.data.message);
        setSuccessModal(true);
        setVideo("");
        removeBanner();
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
          <FaHome style={{ marginRight: 20, fontSize: 20 }} />
          INFORMAÇÕES DA PÁGINA INICIAL
        </div>
        <div>
          <Link to="/" className="link-to-home">
            <FaHome />
          </Link>
        </div>
      </div>

      <div className="content-page">
        <span className="label">Visualização do Banner</span>
        {banner ? (
          <div className="remove-banner">
            <img src={previewBanner} alt="Banner" style={{ width: "100%" }} />
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

        <div className="title-page-two" style={{ marginTop: "20px" }}>
          <div className="header-left">
            <FaVideo style={{ marginRight: 20 }} />
            SALVAR VÍDEOS
          </div>
        </div>

        <div className="video-container">
          <iframe
            width="100%"
            height="100%"
            src={video}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <div className="container-info">
          <span className="title-container-info">
            <FaInfoCircle style={{ marginRight: 15 }} />
            LINK DO VÍDEO
          </span>
          <div style={{ marginTop: "10px" }}>
            <span className="label">
              Url do Youtube
              <span
                style={{
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#777",
                  marginLeft: 15,
                  fontSize: 11,
                }}
              >
                Substitua o <strong>watch?v=</strong> da URL por{" "}
                <strong>embed</strong> ex: https://www.youtube.com/
                <strong>watch?v=</strong>xzx5-_4Vsx8 => https://www.youtube.com
                <strong>/embed/</strong>xzx5-_4Vsx8
              </span>
            </span>
            <input
              type="text"
              className="input-text"
              onChange={(e) => setVideo(e.target.value)}
              value={video}
              maxLength={60}
            />
            <button
              onClick={() => saveHome()}
              type="button"
              className="btn-primary"
              style={{ marginTop: 10 }}
            >
              <span className="btn-label">
                <FaSave />
              </span>
              <span className="btn-text">Salvar Informações</span>
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
            <span>Cadastro de Informações</span>
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
            <span>Cadastro de Informações</span>
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
              Cadastrando Informações, Aguarde...
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
