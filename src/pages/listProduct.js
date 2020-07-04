import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaTshirt,
  FaHome,
  FaLockOpen,
  FaEdit,
  FaTags,
  FaLock,
  FaTimes,
  FaImages,
  FaInfoCircle,
  FaSave,
} from "react-icons/fa";
import Select from "react-select";
import Modal from "react-modal";
import Lottie from "react-lottie";
import api from "../configs/axios";

import successData from "../animations/success.json";
import errorData from "../animations/error.json";
import tshirt from "../assets/camisa-one-web.png";
import loadingData from "../animations/loading.json";

export default function ListProduct() {
  const [products, setProducts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [erro, setErro] = useState(false);
  const [erroModal, setErroModal] = useState(false);
  const [messageErro, setErroMessage] = useState("");
  const [erroStatus, setErroStatus] = useState("");
  const [modal, setModal] = useState(false);
  const [typeModal, setTypeModal] = useState("success");
  const [loadingModal, setLoadingModal] = useState(false);

  const [name, setName] = useState("CATEGORIA");
  const [description, setDescription] = useState("DESCRIÇÃO");
  const [imgAlt, setImgAlt] = useState("");
  const [slug, setSlug] = useState("");
  const [video, setVideo] = useState("");
  const [photo, setPhoto] = useState(null);
  const [idProduct, setIdProduct] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastDescription, setLastDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const [allProducts, setAllProducts] = useState([]);
  const [idCategory, setIdCategory] = useState("");
  const [categoryName, setCategoryName] = useState({});
  const [urlImage, setUrlImage] = useState("");

  const previewPhoto = useMemo(() => {
    return photo ? URL.createObjectURL(photo) : null;
  }, [photo]);

  async function removePhoto() {
    await URL.revokeObjectURL(photo);
    setPhoto(null);
  }

  const colorStyles = {
    option: (styles) => ({ ...styles, color: "#444" }),
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

  useEffect(() => {
    admin();
  }, []);

  async function admin() {
    setLoadingModal(true);
    await api
      .get("/findCategories")
      .then((response) => {
        setProducts(response.data.categories);
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

  function handleCategory(value) {
    setIdCategory(value.value);
    setCategoryName(value);
    findProducts(value.value);
  }

  async function findProducts(id) {
    setLoadingModal(true);
    await api
      .get(`/findByCategory/${id}`)
      .then((response) => {
        setAllProducts(response.data.products);
        setUrlImage(response.data.urlImage);
        setLoadingModal(false);
        console.log(response);
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

  async function handleBlock(value) {
    setLoadingModal(true);
    await api
      .put(`/active/${value._id}`, {
        active: !value.active,
      })
      .then((response) => {
        setLoadingModal(false);
        setErroStatus(response.data.message);
        setTypeModal("success");
        setErroModal(true);
        findProducts(value.category);
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
    setIdProduct(value._id);
    setName(value.name);
    setLastName(value.name);
    setDescription(value.description);
    setLastDescription(value.description);
    setThumbnail(value.thumbnail);
    setSlug(value.slug);
    setVideo(value.video);
    setImgAlt(value.imageDescription);
    setModal(true);
  }

  async function updateProduct() {
    if (idProduct === "") {
      setErroMessage("Escolha um produto");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    if (lastName === "NOME" || lastName === "") {
      setErroMessage("Escolha um nome para o produto");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    if (lastDescription === "DESCRIÇÃO" || lastDescription === "") {
      setErroMessage("Escolha uma descrição para o produto");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    if (video === "") {
      setErroMessage("Escolha um vídeo para o produto");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    if (!video.includes("embed")) {
      setErroMessage(
        "Url do vídeo inválida, substitua o /watch?v= por /embed/"
      );
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    if (imgAlt === "") {
      setErroMessage("Escolha uma descrição para a imagem do produto");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    if (slug === "") {
      setErroMessage("Escolha um slug para o produto");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    if (photo === null) {
      setErroMessage("Escolha uma imagem para o produto");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    setModal(false);
    setLoadingModal(true);
    let data = new FormData();
    data.append("thumbnail", photo);
    data.append("name", lastName);
    data.append("description", lastDescription);
    data.append("slug", slug);
    data.append("video", video);
    data.append("imageDescription", imgAlt);
    await api
      .put(`/products/${idProduct}`, data)
      .then((response) => {
        setLoadingModal(false);
        setErroStatus(response.data.message);
        setTypeModal("success");
        setErroModal(true);
        findProducts(idCategory);
        setThumbnail("");
        setLastDescription("");
        setLastName("");
        setName("");
        setDescription("");
        setSlug("");
        setVideo("");
        setImgAlt("");
        removePhoto();
        setPhoto(null);
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
          <FaTshirt style={{ marginRight: 20, fontSize: 20 }} />
          LISTAGEM DE PRODUTOS
        </div>
        <div>
          <Link to="/" className="link-to-home">
            <FaHome />
          </Link>
        </div>
      </div>
      <div className="content-page">
        <div className="title-page-two">
          <div className="header-left">
            <FaTags style={{ marginRight: 20 }} />
            SELECIONE A CATEGORIA
          </div>
          <div className="select-container">
            <Select
              options={products}
              placeholder="Selecione a Categoria"
              onChange={(value) => handleCategory(value)}
              noOptionsMessage={() => <p>Nenhuma categoria cadastrada</p>}
              styles={colorStyles}
            />
          </div>
        </div>
        <div className="grid-list-product">
          {allProducts.map((allP) => (
            <div className="container-card-list" key={allP._id}>
              <div
                className={`card-product ${
                  allP.active === false ? "disable" : ""
                }`}
              >
                <div className="container-img-card-category">
                  <img
                    alt="card category"
                    src={`${urlImage}/${allP.thumbnail}`}
                    className="card-category-img"
                  />
                </div>
                <span className="title-card-product">{allP.name}</span>
                <span className="link-card-product">{allP.description}</span>
              </div>
              <div className="container-button-card">
                <button
                  onClick={() => handleEdit(allP)}
                  type="button"
                  className="btn-blue"
                >
                  <FaEdit />
                  <span className="btn-text">Editar</span>
                </button>
                <button
                  onClick={() => handleBlock(allP)}
                  type="button"
                  className={allP.active === true ? "btn-red" : "btn-green"}
                >
                  {allP.active === true ? <FaLock /> : <FaLockOpen />}
                  <span className="btn-text">
                    {allP.active === true ? "Bloquear" : "Ativar"}
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
                <div className="card-product">
                  <div className="container-img-card-category">
                    <img
                      alt="card category"
                      src={`${urlImage}/${thumbnail}`}
                      className="card-product-img"
                    />
                  </div>
                  <span className="title-card-product">{name}</span>
                  <span className="link-card-product">{description}</span>
                </div>
              </div>
              <div>
                <span className="label">NOVO CARD</span>
                <div className="card-product">
                  <div className="container-img-card-category">
                    {photo ? (
                      <>
                        <img
                          alt="card category"
                          src={previewPhoto}
                          className="card-product-img"
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
                  <span className="title-card-product">{lastName}</span>
                  <span className="link-card-product">{lastDescription}</span>
                </div>
              </div>
            </div>

            <div className="container-info">
              <span className="title-container-info">
                <FaInfoCircle style={{ marginRight: 15 }} />
                INFORMAÇÕES DO PRODUTO
              </span>
              <div className="grid-product-inputs">
                <div>
                  <span className="label">
                    Nome do Produto
                    <span className="label-info">Máx. 28 caracteres</span>
                  </span>
                  <input
                    type="text"
                    className="input-text"
                    onChange={(e) => setLastName(e.target.value.toUpperCase())}
                    value={lastName}
                    maxLength={28}
                  />
                </div>
                <div>
                  <span className="label">
                    Descrição do Produto
                    <span className="label-info">Máx. 30 caracteres</span>
                  </span>
                  <input
                    type="text"
                    className="input-text"
                    onChange={(e) =>
                      setLastDescription(e.target.value.toUpperCase())
                    }
                    value={lastDescription}
                    maxLength={30}
                  />
                </div>
                <div>
                  <span className="label">Vídeo para o Produto</span>
                  <input
                    type="text"
                    className="input-text"
                    onChange={(e) => setVideo(e.target.value)}
                    value={video}
                  />
                </div>
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
              <div>
                <span className="label">Slug para o Produto</span>
                <textarea
                  type="text"
                  className="text-area"
                  onChange={(e) => setSlug(e.target.value)}
                  value={slug}
                  rows={5}
                />
              </div>
              <hr className="divider" />
              <div className="container-buttons">
                <button
                  onClick={() => updateProduct()}
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
