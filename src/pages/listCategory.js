import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaTags,
  FaHome,
  FaEdit,
  FaLock,
  FaLockOpen,
  FaTimes,
  FaImages,
  FaInfoCircle,
  FaSave,
} from "react-icons/fa";
import Modal from "react-modal";
import Lottie from "react-lottie";
import api from "../configs/axios";

import successData from "../animations/success.json";
import errorData from "../animations/error.json";
import loadingData from "../animations/loading.json";
import tshirt from "../assets/camisa-one-web.png";

export default function ListCategory() {
  const [modal, setModal] = useState(false);
  const [erroModal, setErroModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [messageErro, setErroMessage] = useState("");
  const [erroStatus, setErroStatus] = useState("");
  const [typeModal, setTypeModal] = useState("success");

  const [categories, setCategories] = useState([]);
  const [urlImage, setUrlImage] = useState("");

  const [name, setName] = useState("CATEGORIA");
  const [lastName, setLastName] = useState("");
  const [imgAlt, setImgAlt] = useState("");
  const [photo, setPhoto] = useState(null);
  const [imageCategory, setImageCategory] = useState("");
  const [idCategory, setIdCategory] = useState("");

  const previewPhoto = useMemo(() => {
    return photo ? URL.createObjectURL(photo) : null;
  }, [photo]);

  async function removePhoto() {
    await URL.revokeObjectURL(photo);
    setPhoto(null);
  }

  const successOptions = {
    loop: false,
    autoplay: true,
    animationData: successData,
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
    setLoadingModal(true);
    await api
      .get("/category")
      .then((response) => {
        setCategories(response.data.category);
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

  async function lockCategory(value) {
    setLoadingModal(true);
    await api
      .put(`/category/${value._id}`, {
        active: !value.active,
      })
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

  function handleEdit(value) {
    setName(value.name);
    setLastName(value.name);
    setImgAlt(value.imageDescription);
    setImageCategory(value.thumbnail);
    setIdCategory(value._id);
    setModal(true);
  }

  async function saveEdit() {
    if (lastName === "CATEGORIA" || "") {
      setErroMessage("Escolha um nome para a categoria");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    if (imgAlt === "") {
      setErroMessage("Escolha uma descrição para a imagem");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    if (photo === null) {
      setErroMessage("Escolha uma nova imagem para a categoria");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    setModal(false);
    setLoadingModal(true);
    let data = new FormData();
    data.append("name", lastName);
    data.append("imageDescription", imgAlt);
    data.append("thumbnail", photo);
    await api
      .put(`/categoryEdit/${idCategory}`, data)
      .then((response) => {
        setLoadingModal(false);
        setErroStatus(response.data.message);
        setTypeModal("success");
        setErroModal(true);
        setLastName("");
        setImgAlt("");
        setPhoto(null);
        removePhoto();
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
          <FaTags style={{ marginRight: 20, fontSize: 20 }} />
          LISTAGEM DE CATEGORIAS
        </div>
        <div>
          <Link to="/" className="link-to-home">
            <FaHome />
          </Link>
        </div>
      </div>
      <div className="content-page">
        <div className="grid-list-category">
          {categories.map((cat) => (
            <div className="container-card-list" key={cat._id}>
              <div
                className={`card-category ${
                  cat.active === false ? "disable" : ""
                }`}
              >
                <div className="container-img-card-category">
                  <img
                    alt={cat.imageDescription}
                    src={`${urlImage}/${cat.thumbnail}`}
                    className="card-category-img"
                  />
                </div>
                <span className="title-card-category">{cat.name}</span>
                <span className="link-card-category">VEJA MAIS</span>
              </div>
              <div className="container-button-card">
                <button
                  onClick={() => handleEdit(cat)}
                  type="button"
                  className="btn-blue"
                >
                  <FaEdit />
                  <span className="btn-text">Editar</span>
                </button>
                <button
                  onClick={() => lockCategory(cat)}
                  type="button"
                  className={`${
                    cat.active === false ? "btn-green" : "btn-red"
                  }`}
                >
                  {cat.active === false ? <FaLockOpen /> : <FaLock />}
                  <span className="btn-text">
                    {cat.active === false ? "Ativar" : "Bloquear"}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modal}
        contentLabel="Rota para a API"
        onRequestClose={() => setModal(false)}
        className="modal-edit"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="modal-container">
          <div className="modal-header">
            <span>Editar Categoria</span>
            <button
              className="btn-close-modal"
              onClick={() => {
                setModal(false);
              }}
            >
              <FaTimes />
            </button>
          </div>
          <div className="modal-content">
            <div className="container-modal-card">
              <div>
                <span className="label">CARD ATUAL</span>
                <div className="card-category">
                  <div className="container-img-card-category">
                    <img
                      alt="card category"
                      src={`${urlImage}/${imageCategory}`}
                      className="card-category-img"
                    />
                  </div>
                  <span className="title-card-category">{name}</span>
                  <span className="link-card-category">VEJA MAIS</span>
                </div>
              </div>
              <div>
                <span className="label">NOVO CARD</span>
                <div className="card-category">
                  <div className="container-img-card-category">
                    {photo ? (
                      <>
                        <img
                          alt="card category"
                          src={previewPhoto}
                          className="card-category-img"
                        />
                        <button
                          onClick={() => removePhoto()}
                          className="remove-photo"
                        >
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        <label id="xmlFile">
                          <input
                            type="file"
                            onChange={(event) =>
                              setPhoto(event.target.files[0])
                            }
                          />
                          <FaImages
                            style={{ fontSize: 50, marginBottom: 20 }}
                          />
                          Clique aqui para adicionar uma imagem ao produto
                        </label>
                      </>
                    )}
                  </div>
                  <span className="title-card-category">{lastName}</span>
                  <span className="link-card-category">VEJA MAIS</span>
                </div>
              </div>
            </div>

            <div className="container-info">
              <span className="title-container-info">
                <FaInfoCircle style={{ marginRight: 15 }} />
                INFORMAÇÕES DA CATEGORIA
              </span>
              <div className="grid-category">
                <div>
                  <span className="label">
                    Nome da Categoria
                    <span className="label-info">Máx. 23 caracteres</span>
                  </span>
                  <input
                    type="text"
                    className="input-text"
                    onChange={(e) => setLastName(e.target.value.toUpperCase())}
                    value={lastName}
                    maxLength={23}
                  />
                </div>
                <div>
                  <span className="label">Descrição para a Imagem</span>
                  <input
                    type="text"
                    className="input-text"
                    onChange={(e) => setImgAlt(e.target.value)}
                    value={imgAlt}
                  />
                </div>
              </div>
              <hr className="divider" />
              <div className="container-buttons">
                <button
                  onClick={() => saveEdit()}
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
