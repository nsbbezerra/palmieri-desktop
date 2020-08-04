import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaTshirt,
  FaSave,
  FaInfoCircle,
  FaTags,
  FaImages,
  FaTimes,
  FaRulerHorizontal,
  FaCheck,
} from "react-icons/fa";
import Select from "react-select";

import api from "../configs/axios";
import Modal from "react-modal";
import Lottie from "react-lottie";

import successData from "../animations/success.json";
import errorData from "../animations/error.json";
import loadingData from "../animations/loading.json";

export default function Products() {
  const [name, setName] = useState("NOME");
  const [description, setDescription] = useState("DESCRIÇÃO");
  const [imgAlt, setImgAlt] = useState("");
  const [slug, setSlug] = useState("");
  const [products, setProducts] = useState([]);
  const [video, setVideo] = useState("");
  const [photo, setPhoto] = useState(null);
  const [model, setModel] = useState(null);
  const [table, setTable] = useState(null);
  const [idCategory, setIdCategory] = useState("");
  const [categoryName, setCategoryName] = useState({});
  const [idProduct, setIdProduct] = useState("");
  const [titleModel, setTitleModel] = useState("TÍTULO");
  const [descModel, setDescModel] = useState("DESCRIÇÃO");
  const [urlPhoto, setUrlPhoto] = useState("");

  const [models, setModels] = useState([]);
  const [tables, setTables] = useState([]);

  const [erroModal, setErroModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [messageErro, setErroMessage] = useState("");
  const [erroStatus, setErroStatus] = useState("");
  const [typeModal, setTypeModal] = useState("success");

  const previewPhoto = useMemo(() => {
    return photo ? URL.createObjectURL(photo) : null;
  }, [photo]);

  const previewModel = useMemo(() => {
    return model ? URL.createObjectURL(model) : null;
  }, [model]);

  const previewTable = useMemo(() => {
    return table ? URL.createObjectURL(table) : null;
  }, [table]);

  const colorStyles = {
    option: (styles) => ({ ...styles, color: "#444" }),
  };

  function allClear() {
    setPhoto(null);
    setName("NOME");
    setDescription("DESCRIÇÃO");
    setCategoryName("");
    setIdCategory("");
    setSlug("");
    setVideo("");
    setImgAlt("");
    removePhoto();
    setIdProduct("");
    setTable(null);
    removeTable();
    setModel(null);
    removeModel();
    setTitleModel("TÍTULO");
    setDescModel("DESCRIÇÃO");
    setCategoryName({});
    setIdCategory("");
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

  async function removePhoto() {
    await URL.revokeObjectURL(photo);
    setPhoto(null);
  }

  async function removeModel() {
    await URL.revokeObjectURL(model);
    setModel(null);
  }

  async function removeTable() {
    await URL.revokeObjectURL(table);
    setTable(null);
  }

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

  function handleCategory(id) {
    setIdCategory(id.value);
    setCategoryName(id);
  }

  async function saveProduct() {
    if (idCategory === "") {
      setErroMessage("Escolha uma categoria para o produto");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    if (name === "NOME" || name === "") {
      setErroMessage("Escolha um nome para o produto");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    if (description === "DESCRIÇÃO" || description === "") {
      setErroMessage("Escolha uma descrição para o produto");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    if (video !== "") {
      if (!video.includes("embed")) {
        setErroMessage(
          "Url do vídeo inválida, substitua o /watch?v= por /embed/"
        );
        setErroStatus("Erro de validação");
        setTypeModal("erro");
        setErroModal(true);
        return false;
      }
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
    setLoadingModal(true);
    let data = new FormData();
    data.append("thumbnail", photo);
    data.append("name", name);
    data.append("category", idCategory);
    data.append("description", description);
    data.append("slug", slug);
    data.append("video", video);
    data.append("imageDescription", imgAlt);
    await api
      .post("/products", data)
      .then((response) => {
        setLoadingModal(false);
        setErroStatus("Produto cadastrado com sucesso!");
        setIdProduct(response.data);
        setTypeModal("success");
        setErroModal(true);
        setPhoto(null);
        setName("NOME");
        setDescription("DESCRIÇÃO");
        setCategoryName("");
        setIdCategory("");
        setSlug("");
        setVideo("");
        setImgAlt("");
        removePhoto();
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

  async function saveModel() {
    setLoadingModal(true);
    if (titleModel === "TÍTULO" || titleModel === "") {
      setErroMessage("Escolha um título para a modelagem do produto");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    if (descModel === "DESCRIÇÃO" || descModel === "") {
      setErroMessage("Escolha uma descrição para a modelagem do produto");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    if (model === null) {
      setErroMessage("Escolha uma imagem para a modelagem do produto");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    let data = new FormData();
    data.append("desc", descModel);
    data.append("title", titleModel);
    data.append("models", model);
    await api
      .post(`/saveModels/${idProduct}`, data)
      .then((response) => {
        setModels(response.data.models.models);
        setUrlPhoto(response.data.urlImage);
        setLoadingModal(false);
        setErroStatus("Modelagem cadastrada com sucesso!");
        setTypeModal("success");
        setErroModal(true);
        setDescModel("DESCRIÇÃO");
        setTitleModel("TÍTULO");
        setModel(null);
        removeModel();
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

  async function saveTable() {
    setLoadingModal(true);
    if (table === null) {
      setErroMessage("Escolha uma imagem para a tabela de tamanhos do produto");
      setErroStatus("Erro de validação");
      setTypeModal("erro");
      setErroModal(true);
      return false;
    }
    let data = new FormData();
    data.append("tables", table);
    await api
      .post(`/saveTables/${idProduct}`, data)
      .then((response) => {
        setUrlPhoto(response.data.urlImage);
        setTables(response.data.tables.table);
        setLoadingModal(false);
        setErroStatus("Tabela cadastrada com sucesso!");
        setIdProduct(response.data);
        setTypeModal("success");
        setErroModal(true);
        setTable(null);
        removeTable();
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
          CADASTRO DE PRODUTOS
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
              value={categoryName}
              options={products}
              placeholder="Selecione a Categoria"
              onChange={(value) => handleCategory(value)}
              noOptionsMessage={() => <p>Nenhuma categoria cadastrada</p>}
              styles={colorStyles}
            />
          </div>
        </div>
        {idProduct === "" ? (
          <>
            <div className="products-grid-save">
              <div>
                <span className="label">CARD</span>
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
                  <span className="title-card-product">{name}</span>
                  <span className="link-card-product">{description}</span>
                </div>
              </div>

              <div>
                <span className="label">VÍDEO</span>
                <iframe
                  className="video-youtube"
                  src={video}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
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
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                    value={name}
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
                      setDescription(e.target.value.toUpperCase())
                    }
                    value={description}
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
                  onClick={() => saveProduct()}
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
          </>
        ) : (
          <>
            <div className="title-page-two" style={{ marginTop: 40 }}>
              <div className="header-left">
                <FaRulerHorizontal style={{ marginRight: 20 }} />
                CADASTRO DE MODELAGENS
              </div>
            </div>

            <div className="medida-grid">
              {!!models.length && (
                <>
                  {models.map((mod) => (
                    <div className="medida-item" key={mod._id}>
                      <img
                        className="medida-img"
                        alt="Palmieri Uniformes"
                        src={`${urlPhoto}/${mod.image}`}
                      />
                      <h4 className="title-medida-product">{mod.title}</h4>
                      <p className="desc-medida-product">{mod.desc}</p>
                    </div>
                  ))}
                </>
              )}
              <div className="medida-item">
                {model ? (
                  <>
                    <img
                      className="medida-img"
                      alt="Palmieri Uniformes"
                      src={previewModel}
                    />
                  </>
                ) : (
                  <label id="xmlModel">
                    <input
                      type="file"
                      onChange={(event) => setModel(event.target.files[0])}
                    />
                    <FaImages style={{ fontSize: 50, marginBottom: 20 }} />
                    Clique aqui para adicionar uma imagem da modelagem do
                    produto
                  </label>
                )}

                <h4 className="title-medida-product">{titleModel}</h4>
                <p className="desc-medida-product">{descModel}</p>
              </div>
            </div>

            <div className="container-info">
              <span className="title-container-info">
                <FaInfoCircle style={{ marginRight: 15 }} />
                INFORMAÇÕES DA MODELAGEM
              </span>
              <div>
                <span className="label">Título para a Modelagem</span>
                <input
                  type="text"
                  className="input-text"
                  onChange={(e) => setTitleModel(e.target.value)}
                  value={titleModel}
                />
              </div>
              <div>
                <span className="label">Descrição para a Modelagem</span>
                <textarea
                  type="text"
                  className="text-area"
                  onChange={(e) => setDescModel(e.target.value)}
                  value={descModel}
                  rows={5}
                />
              </div>
              <hr className="divider" />
              <div className="container-buttons">
                <button
                  onClick={() => saveModel()}
                  type="button"
                  className="btn-primary"
                >
                  <span className="btn-label">
                    <FaSave />
                  </span>
                  <span className="btn-text">Salvar Modelagem</span>
                </button>
              </div>
            </div>

            <div className="title-page-two" style={{ marginTop: 40 }}>
              <div className="header-left">
                <FaRulerHorizontal style={{ marginRight: 20 }} />
                CADASTRO DE TABELAS DE TAMANHOS
              </div>
            </div>

            <div className="medida-table-grid">
              {!!tables.length && (
                <>
                  {tables.map((tab) => (
                    <div className="medida-grid-table-item" key={tab._id}>
                      <img
                        alt="Palmieri Uniformes"
                        src={`${urlPhoto}/${tab.image}`}
                        className="image-table"
                      />
                    </div>
                  ))}
                </>
              )}
              {table ? (
                <>
                  <div className="medida-grid-table-item">
                    <img
                      alt="Palmieri Uniformes"
                      src={previewTable}
                      className="image-table"
                    />
                  </div>
                </>
              ) : (
                <div className="medida-grid-table-item">
                  <label id="xmlModel">
                    <input
                      type="file"
                      onChange={(event) => setTable(event.target.files[0])}
                    />
                    <FaImages style={{ fontSize: 50, marginBottom: 20 }} />
                    Clique aqui para adicionar uma imagem da tabela de tamanhos
                    do produto
                  </label>
                </div>
              )}
            </div>

            <div className="container-buttons-header">
              <button
                onClick={() => saveTable()}
                type="button"
                className="btn-primary"
                style={{ marginBottom: 30, width: 300 }}
              >
                <span className="btn-label">
                  <FaSave />
                </span>
                <span className="btn-text">Salvar Tabela</span>
              </button>
              <button
                onClick={() => allClear()}
                type="button"
                className="btn-green"
                style={{ marginBottom: 30 }}
              >
                <span className="btn-label">
                  <FaCheck />
                </span>
                <span className="btn-text">Concluir Cadastro</span>
              </button>
            </div>
          </>
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
