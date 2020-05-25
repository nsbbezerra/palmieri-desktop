import React, { useState, useMemo, useEffect } from "react";
import {
  FaHome,
  FaImages,
  FaTshirt,
  FaSave,
  FaInfoCircle,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Select from "react-select";
import Modal from "react-modal";
import Lottie from "react-lottie";
import successData from "../animations/success.json";
import errorData from "../animations/error.json";
import loadingData from "../animations/loading.json";
import api from "../configs/axios";

export default function SaveCatalog() {
  const [imageCatalog, setImageCatalog] = useState(null);
  const [products, setProducts] = useState([]);
  const [idProduct, setIdProduct] = useState("");
  const [erroModal, setErroModal] = useState(false);
  const [messageErro, setErroMessage] = useState("");
  const [erroStatus, setErroStatus] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingFind, setLoadingFind] = useState(false);
  const [catalogs, setCatalogs] = useState([]);
  const [productSelect, setProductSelect] = useState({});
  const [urlPhoto, setUrlPhoto] = useState("");
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [idCatalog, setIdCatalog] = useState("");

  const previewImage = useMemo(() => {
    return imageCatalog ? URL.createObjectURL(imageCatalog) : null;
  }, [imageCatalog]);

  async function removeImage() {
    await URL.revokeObjectURL(imageCatalog);
    setImageCatalog(null);
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

  async function admin() {
    setLoadingFind(true);
    await api
      .get("/listProducts")
      .then((response) => {
        setProducts(response.data.listProducts);
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

  useEffect(() => {
    admin();
  }, []);

  function handleProduct(info) {
    setProductSelect(info);
    setIdProduct(info.value);
    findCatalogId(info.value);
  }

  async function findCatalog() {
    setLoadingFind(true);
    await api
      .get(`/portifolio/${idProduct}`)
      .then((response) => {
        setCatalogs(response.data.portifolio);
        setUrlPhoto(response.data.urlImage);
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

  async function findCatalogId(id) {
    setLoadingFind(true);
    await api
      .get(`/portifolio/${id}`)
      .then((response) => {
        setCatalogs(response.data.portifolio);
        setUrlPhoto(response.data.urlImage);
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

  async function registerCatalog() {
    if (imageCatalog === null) {
      setErroStatus("Erro ao cadastrar o Catálogo");
      setErroMessage("Insira uma foto para o catálogo");
      setErroModal(true);
      return false;
    }
    if (idProduct === "") {
      setErroStatus("Erro ao cadastrar o Catálogo");
      setErroMessage("Selecione o produto para cadastro");
      setErroModal(true);
      return false;
    }
    setLoading(true);
    let data = new FormData();
    data.append("portifolio", imageCatalog);
    data.append("product", idProduct);
    await api
      .post("/portifolio", data)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setLoading(false);
        removeImage();
        findCatalog();
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

  function handleRemove(id) {
    setIdCatalog(id);
    setModalConfirm(true);
  }

  async function removeCatalog() {
    setModalConfirm(false);
    setLoadingRemove(true);
    await api
      .delete(`/portifolio/${idCatalog}`)
      .then((response) => {
        setSuccessMessage(response.data.message);
        findCatalog();
        setLoadingRemove(false);
        setSuccessModal(true);
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          setErroStatus("Sem conexão com o servidor");
          setErroMessage(
            "Não foi possível estabelecer uma conexão com o servidor"
          );
          setErroModal(true);
          setLoadingRemove(false);
        } else {
          setErroStatus(error.response.data.erro.message);
          setErroMessage(error.response.data.erro.type);
          setErroModal(true);
          setLoadingRemove(false);
        }
      });
  }

  return (
    <>
      <div className="header-component">
        <div className="header-left">
          <FaImages style={{ marginRight: 20, fontSize: 20 }} />
          CADASTRO DE CATÁLOGOS
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
            <FaTshirt style={{ marginRight: 20 }} />
            SELECIONE O PRODUTO
          </div>
          <div className="select-container">
            <Select
              options={products}
              placeholder="Selecione o Produto"
              onChange={(valor) => handleProduct(valor)}
              value={productSelect}
              noOptionsMessage={() => <p>Nenhum produto cadastrado</p>}
            />
          </div>
        </div>
        <div className="container-catalog">
          <>
            {catalogs.length ? (
              <>
                {catalogs.map((cat) => (
                  <div
                    className="card-product-two"
                    style={{ marginBottom: "20px" }}
                    key={cat._id}
                  >
                    <button
                      className="btn-badge"
                      onClick={() => handleRemove(cat._id)}
                    >
                      <FaTimes />
                    </button>
                    <img
                      className="card-image"
                      alt="Imagem"
                      src={`${urlPhoto}/${cat.image}`}
                    />
                  </div>
                ))}
              </>
            ) : (
              ""
            )}
            <div className="card-product" style={{ marginBottom: "20px" }}>
              {!imageCatalog ? (
                <div className="card-image-icon">
                  <FaImages
                    style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                  />
                </div>
              ) : (
                <img className="card-image" alt="Imagem" src={previewImage} />
              )}
            </div>
          </>
        </div>
        <div className="container-info">
          <span className="title-container-info">
            <FaInfoCircle style={{ marginRight: 15 }} />
            INFORMAÇÕES DO CATÁLOGO
          </span>
          <div style={{ marginTop: "10px" }}>
            {imageCatalog ? (
              <button
                className="remove-img"
                onClick={() => removeImage()}
                type="button"
              >
                <FaTimes style={{ fontSize: 50, color: "#f44336" }} />
                <p>{imageCatalog.name}</p>
              </button>
            ) : (
              <label id="photoFile">
                <input
                  type="file"
                  onChange={(event) => setImageCatalog(event.target.files[0])}
                />
                <FaImages style={{ fontSize: 30, marginBottom: 20 }} />
                Clique aqui para adicionar uma foto do catálogo
              </label>
            )}
            <button
              onClick={() => registerCatalog()}
              type="button"
              className="btn-primary"
              style={{ marginTop: 10 }}
            >
              <span className="btn-label">
                <FaSave />
              </span>
              <span className="btn-text">Salvar Catálogo</span>
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
            <span>Cadastro de Catálogo</span>
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
            <span>Cadastro de Catálogo</span>
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
              Cadastrando Catálogo, Aguarde...
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
        isOpen={loadingRemove}
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
              Removendo Catálogo, Aguarde...
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
              Pretende excluir este catálogo?
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
              onClick={() => {
                removeCatalog();
              }}
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
