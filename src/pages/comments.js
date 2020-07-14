import React, { useState, useMemo } from "react";
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

export default function SaveComments() {
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [photo, setPhoto] = useState(null);

  const [erroModal, setErroModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [messageErro, setErroMessage] = useState("");
  const [erroStatus, setErroStatus] = useState("");
  const [typeModal, setTypeModal] = useState("success");

  const previewPhoto = useMemo(() => {
    return photo ? URL.createObjectURL(photo) : null;
  }, [photo]);

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

  async function removePhoto() {
    await URL.revokeObjectURL(photo);
    setPhoto(null);
  }

  async function createComment() {
    if (comment === "") {
      setErroMessage("Adicione um comentário");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    if (author === "") {
      setErroMessage("Adicione um autor para o comentário");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    if (photo === null) {
      setErroMessage("Escolha uma avatar para o comentário");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    setLoadingModal(true);
    let data = new FormData();
    data.append("text", comment);
    data.append("author", author);
    data.append("avatar", photo);
    await api
      .post("/depoiments", data)
      .then((response) => {
        setAuthor("");
        setComment("");
        setPhoto(null);
        removePhoto();
        setLoadingModal(false);
        setErroStatus(response.data.message);
        setTypeModal("success");
        setErroModal(true);
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
          CADASTRO DE COMENTÁRIOS
        </div>
        <div>
          <Link to="/" className="link-to-home">
            <FaHome />
          </Link>
        </div>
      </div>

      <div className="content-page">
        <div className="center-card">
          <div className="depoiment-container">
            <div className="depoiment-content">{comment}</div>
            {photo ? (
              <>
                <img
                  className="depoiment-avatar"
                  alt="avatar"
                  src={previewPhoto}
                />
                <button onClick={() => removePhoto()} className="remove-avatar">
                  <FaTimes />
                </button>
              </>
            ) : (
              <>
                <label id="xmlAvatar">
                  <input
                    type="file"
                    onChange={(event) => setPhoto(event.target.files[0])}
                  />
                  <FaImages style={{ fontSize: 40 }} />
                </label>
              </>
            )}
            <span className="author">{author}</span>
          </div>
        </div>

        <div className="container-info">
          <span className="title-container-info">
            <FaInfoCircle style={{ marginRight: 15 }} />
            INFORMAÇÕES DO COMENTÁRIO
          </span>
          <div className="grid-category">
            <div>
              <span className="label">
                Comentário
                <span className="label-info">Máx. 200 caracteres</span>
              </span>
              <input
                type="text"
                className="input-text"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                maxLength={200}
              />
            </div>
            <div>
              <span className="label">
                Autor <span className="label-info">Máx. 50 caracteres</span>
              </span>
              <input
                type="text"
                className="input-text"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                maxLength={50}
              />
            </div>
          </div>
          <hr className="divider" />
          <div className="container-buttons">
            <button
              onClick={() => createComment()}
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
