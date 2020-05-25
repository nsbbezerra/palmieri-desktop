import React, { useState, useMemo, useEffect } from "react";
import {
  FaHome,
  FaSave,
  FaRocketchat,
  FaImages,
  FaTimes,
  FaInfoCircle,
  FaVideo,
  FaCheck,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Lottie from "react-lottie";
import successData from "../animations/success.json";
import errorData from "../animations/error.json";
import loadingData from "../animations/loading.json";
import api from "../configs/axios";

import icone from "../assets/icone.svg";
import logo from "../assets/logo.svg";

export default function SaveDepoiments() {
  const [titleDepoimet, setTitleDepoiment] = useState("Título");
  const [imageDepoiment, setImageDepoiment] = useState(null);
  const [urlVide, setUrlVideo] = useState("");
  const [erroModal, setErroModal] = useState(false);
  const [messageErro, setErroMessage] = useState("");
  const [erroStatus, setErroStatus] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingFind, setLoadingFind] = useState(false);
  const [depoiments, setDepoiments] = useState([]);
  const [videos, setVideos] = useState([]);
  const [urlImages, setUrlImages] = useState("");
  const [modalConfirm, setModalConfirm] = useState(false);

  const previewImage = useMemo(() => {
    return imageDepoiment ? URL.createObjectURL(imageDepoiment) : null;
  }, [imageDepoiment]);

  async function removeImageDepoiment() {
    await URL.revokeObjectURL(imageDepoiment);
    setImageDepoiment(null);
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

  async function saveDepoiment() {
    if (titleDepoimet === "Título") {
      setErroStatus("Erro ao cadastrar o Depoimento");
      setErroMessage("Insira um título para o depoimento");
      setErroModal(true);
      return false;
    }
    if (imageDepoiment === null) {
      setErroStatus("Erro ao cadastrar o Depoimento");
      setErroMessage("Insira uma imagem para o depoimento");
      setErroModal(true);
      return false;
    }
    setLoading(true);
    let data = new FormData();
    data.append("image", imageDepoiment);
    data.append("title", titleDepoimet);
    await api
      .post("/depoiments", data)
      .then((response) => {
        setSuccessMessage(response.data.message);
        removeImageDepoiment();
        setTitleDepoiment("Título");
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
          setLoadingFind(false);
        } else {
          setErroStatus(error.response.data.erro.message);
          setErroMessage(error.response.data.erro.type);
          setErroModal(true);
          setLoadingFind(false);
        }
      });
  }

  async function admin() {
    setLoadingFind(true);
    await api
      .get("/depoiments")
      .then((response) => {
        if (response.data.allDepoiments) {
          setDepoiments(response.data.allDepoiments.image);
          setVideos(response.data.allDepoiments.video);
        }
        setUrlImages(response.data.urlImages);
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

  async function saveVideo() {
    if (urlVide === "") {
      setErroStatus("Erro ao cadastrar o Vídeo");
      setErroMessage("Insira uma URL do Vídeo");
      setErroModal(true);
      return false;
    }
    if (urlVide.includes("watch?v=")) {
      setErroStatus("Erro ao cadastrar o Vídeo");
      setErroMessage(
        "Insira uma URL válida, retire o (watch?v=) e o substitua por (embed)"
      );
      setErroModal(true);
      return false;
    }
    setLoading(true);
    await api
      .post("/sendVideo", {
        video: urlVide,
      })
      .then((response) => {
        setLoading(false);
        setUrlVideo("");
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

  useEffect(() => {
    admin();
  }, []);

  async function removeVideo(id) {
    let newArray = await videos.filter(function (item) {
      return item._id !== id;
    });
    await setVideos(newArray);
    updateVideos(newArray);
  }

  async function updateVideos(values) {
    setLoading(true);
    await api
      .put(`/uploadVideo`, {
        videos: values,
      })
      .then((response) => {
        setSuccessMessage(response.data.message);
        setLoading(false);
        setSuccessModal(true);
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

  async function removeDepoiments(id) {
    let newArray = await depoiments.filter(function (item) {
      return item._id !== id;
    });
    await setDepoiments(newArray);
    updateDepoiments(newArray);
  }

  async function updateDepoiments(values) {
    setLoading(true);
    await api
      .put(`/uploadImage`, {
        images: values,
      })
      .then((response) => {
        setSuccessMessage(response.data.message);
        setLoading(false);
        setSuccessModal(true);
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
          <FaRocketchat style={{ marginRight: 20, fontSize: 20 }} />
          CADASTRO DE DEPOIMENTOS
        </div>
        <div>
          <Link to="/" className="link-to-home">
            <FaHome />
          </Link>
        </div>
      </div>

      <div className="content-page">
        <div className="used-container">
          {depoiments.length ? (
            <>
              {depoiments.map((dep) => (
                <div className="used-item" key={dep._id}>
                  <button
                    className="btn-badge"
                    onClick={() => removeDepoiments(dep._id)}
                  >
                    <FaTimes />
                  </button>
                  <div className="item-img">
                    <img
                      className="img-item-used"
                      alt="Imagem"
                      src={`${urlImages}/${dep.photo}`}
                    />
                  </div>
                  <div className="item-desc">
                    <div className="logo-container-used">
                      <img src={icone} alt="icone" className="icone-used" />
                      <img src={logo} alt="logo" className="logo-used" />
                    </div>
                    <span className="used-description">{dep.title}</span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            ""
          )}
          <div className="used-item">
            <div className="item-img">
              {!imageDepoiment ? (
                <div className="card-image-icon">
                  <FaImages
                    style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                  />
                </div>
              ) : (
                <img
                  className="img-item-used"
                  alt="Imagem"
                  src={previewImage}
                />
              )}
            </div>
            <div className="item-desc">
              <div className="logo-container-used">
                <img src={icone} alt="icone" className="icone-used" />
                <img src={logo} alt="logo" className="logo-used" />
              </div>
              <span className="used-description">{titleDepoimet}</span>
            </div>
          </div>
        </div>

        <div className="container-info">
          <span className="title-container-info">
            <FaInfoCircle style={{ marginRight: 15 }} />
            INFORMAÇÕES DO DEPOIMENTO
          </span>
          <div className="grid-products-info">
            {imageDepoiment ? (
              <button
                className="remove-img"
                onClick={() => removeImageDepoiment()}
                type="button"
              >
                <FaTimes style={{ fontSize: 50, color: "#f44336" }} />
                <p>{imageDepoiment.name}</p>
              </button>
            ) : (
              <label id="photoFile">
                <input
                  type="file"
                  onChange={(event) => setImageDepoiment(event.target.files[0])}
                />
                <FaImages style={{ fontSize: 30, marginBottom: 20 }} />
                Clique aqui para adicionar a foto do produto
              </label>
            )}
            <div>
              <span className="label">
                Título do Catálogo
                <span
                  style={{
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#777",
                    marginLeft: 15,
                    fontSize: 11,
                  }}
                >
                  Máx. 60 caracteres
                </span>
              </span>
              <input
                type="text"
                className="input-text"
                onChange={(e) => setTitleDepoiment(e.target.value)}
                value={titleDepoimet}
                maxLength={60}
              />
            </div>
          </div>
          <hr className="divider" />
          <div className="container-buttons">
            <button
              onClick={() => saveDepoiment()}
              type="button"
              className="btn-primary"
            >
              <span className="btn-label">
                <FaSave />
              </span>
              <span className="btn-text">Salvar Informações</span>
            </button>
          </div>
        </div>

        <div className="title-page-two">
          <div className="header-left">
            <FaVideo style={{ marginRight: 20 }} />
            SALVAR VÍDEOS
          </div>
        </div>

        <div className="video-content">
          {videos.length ? (
            <>
              {videos.map((vid) => (
                <div className="video-container" key={vid._id}>
                  <button
                    className="btn-badge"
                    onClick={() => removeVideo(vid._id)}
                  >
                    <FaTimes />
                  </button>
                  <iframe
                    width="100%"
                    height="100%"
                    src={vid.url}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </>
          ) : (
            ""
          )}
          <div className="video-container">
            <iframe
              width="100%"
              height="100%"
              src={urlVide}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
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
              onChange={(e) => setUrlVideo(e.target.value)}
              value={urlVide}
              maxLength={60}
            />
            <button
              onClick={() => saveVideo()}
              type="button"
              className="btn-primary"
              style={{ marginTop: 10 }}
            >
              <span className="btn-label">
                <FaSave />
              </span>
              <span className="btn-text">Salvar Vídeo</span>
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
            <span>Cadastro de Depoimentos</span>
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
            <span>Cadastro de Depoimentos</span>
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
              Cadastrando Depoimento, Aguarde...
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
            <span>Exclusão de Catálogo</span>
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
              Pretende excluir este item?
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
              onClick={() => {}}
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
