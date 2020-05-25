import React, { useState, useEffect, useMemo } from "react";
import {
  FaTags,
  FaHome,
  FaInfoCircle,
  FaTimes,
  FaCheck,
  FaEdit,
  FaImages,
  FaImage,
  FaSave,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Lottie from "react-lottie";
import successData from "../animations/success.json";
import errorData from "../animations/error.json";
import loadingData from "../animations/loading.json";
import api from "../configs/axios";

export default function ListProducts() {
  const [products, setProducts] = useState([]);
  const [erroModal, setErroModal] = useState(false);
  const [messageErro, setErroMessage] = useState("");
  const [erroStatus, setErroStatus] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [loadingFind, setLoadingFind] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [banner, setBanner] = useState(null);
  const [imagem, setImagem] = useState(null);
  const [modalEditBanner, setModalEditBanner] = useState(false);
  const [modalEditImage, setModalEditImage] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const successOptions = {
    loop: false,
    autoplay: true,
    animationData: successData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const previewBanner = useMemo(() => {
    return banner ? URL.createObjectURL(banner) : null;
  }, [banner]);

  const previewPhoto = useMemo(() => {
    return imagem ? URL.createObjectURL(imagem) : null;
  }, [imagem]);

  async function removeBanner() {
    await URL.revokeObjectURL(banner);
    setBanner(null);
  }

  async function removePhoto() {
    await URL.revokeObjectURL(imagem);
    setImagem(null);
  }

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

  async function finder() {
    setLoadingFind(true);
    await api
      .get("/products")
      .then((response) => {
        setProducts(response.data.products);
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

  function removeProduct(id) {
    setIdProduct(id);
    setModalConfirm(true);
  }

  async function excludeProduct() {
    setModalConfirm(false);
    setLoading(true);
    await api
      .delete(`/products/${idProduct}`)
      .then((response) => {
        setLoading(false);
        setSuccessMessage(response.data.message);
        setSuccessModal(true);
        finder();
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
    finder();
  }, []);

  function handleEdit(value) {
    setTitle(value.name);
    setDescription(value.description);
    setIdProduct(value._id);
    setModalEdit(true);
  }

  async function editInfo() {
    setModalEdit(false);
    setLoading(true);
    await api
      .put(`/changeInfo/${idProduct}`, {
        name: title,
        description: description,
      })
      .then((response) => {
        setSuccessMessage(response.data.message);
        setLoading(false);
        finder();
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

  function handleBanner(id) {
    setIdProduct(id);
    setModalEditBanner(true);
  }

  function handleEditImage(id) {
    setIdProduct(id);
    setModalEditImage(true);
  }

  async function updateBanner() {
    setModalEditBanner(false);
    if (banner === null) {
      setErroStatus("Erro ao cadastrar o Banner");
      setErroMessage("Não existe uma imagem para cadastro");
      setErroModal(true);
      return false;
    }
    setLoading(true);
    let data = new FormData();
    data.append("banner", banner);
    await api
      .put(`/changeBanner/${idProduct}`, data)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setLoading(false);
        setSuccessModal(true);
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

  async function updateImage() {
    setModalEditImage(false);
    if (imagem === null) {
      setErroStatus("Erro ao cadastrar a Imagem");
      setErroMessage("Não existe uma imagem para cadastro");
      setErroModal(true);
      return false;
    }
    setLoading(true);
    let data = new FormData();
    data.append("image", imagem);
    await api
      .put(`/changeImage/${idProduct}`, data)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setLoading(false);
        setSuccessModal(true);
        removePhoto();
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
          <FaTags style={{ marginRight: 20, fontSize: 20 }} />
          LISTAGEM DE PRODUTOS
        </div>
        <div>
          <Link to="/" className="link-to-home">
            <FaHome />
          </Link>
        </div>
      </div>

      <div className="content-page">
        {products.length ? (
          <div className="container-info">
            <span className="title-container-info">
              <FaInfoCircle style={{ marginRight: 15 }} />
              INFORMAÇÕES DOS PRODUTOS
            </span>
            <table className="table-products" cellSpacing="0">
              <thead>
                <tr>
                  <td>PRODUTO</td>
                  <td>AÇÕES</td>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod._id}>
                    <td>{prod.name}</td>
                    <td>
                      <button
                        className="btn-success btn-table"
                        onClick={() => handleBanner(prod._id)}
                      >
                        <FaImages style={{ marginRight: 10 }} /> Banner
                      </button>
                      <button
                        className="btn-success btn-table"
                        onClick={() => handleEditImage(prod._id)}
                      >
                        <FaImage style={{ marginRight: 10 }} /> Imagem
                      </button>
                      <button
                        className="btn-circle btn-success"
                        onClick={() => handleEdit(prod)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn-circle"
                        onClick={() => removeProduct(prod._id)}
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
            Nenhum produto cadastrado
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
            <span>Exclusão de Produtos</span>
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
            <span>Exclusão de Produtos</span>
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
              Gerenciando Produto, Aguarde...
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
              Buscando Produtos, Aguarde...
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
            <span>Gerenciador de Produtos</span>
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
              Pretende excluir este produto?
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
                excludeProduct();
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

      <Modal
        isOpen={modalEdit}
        contentLabel="Rota para a API"
        className="modal"
        onRequestClose={() => setModalEdit(false)}
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="modal-container">
          <div className="modal-header">
            <span>Edição de Produtos</span>
            <button
              className="btn-close-modal"
              onClick={() => {
                setModalEdit(false);
              }}
            >
              <FaTimes />
            </button>
          </div>
          <div className="modal-content">
            <div>
              <span className="label">
                Nome do Produto
                <span
                  style={{
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#777",
                    marginLeft: 15,
                    fontSize: 11,
                  }}
                >
                  Máx. 24 caracteres
                </span>
              </span>
              <input
                type="text"
                className="input-text"
                onChange={(e) => setTitle(e.target.value.toUpperCase())}
                value={title}
                maxLength={24}
              />
              <span className="label">
                Descrição do Produto
                <span
                  style={{
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#777",
                    marginLeft: 15,
                    fontSize: 11,
                  }}
                >
                  Máx. 250 caracteres
                </span>
              </span>
              <textarea
                type="text"
                className="text-area"
                style={{ height: 55 }}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                maxLength={250}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => setModalEdit(false)}
              type="button"
              className="btn-primary btn-small btn-erro"
            >
              <span className="btn-label btn-label-small btn-erro-label">
                <FaTimes />
              </span>
              <span className="btn-text">Cancelar</span>
            </button>

            <button
              onClick={() => {
                editInfo();
              }}
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
      </Modal>

      <Modal
        isOpen={modalEditBanner}
        contentLabel="Rota para a API"
        className="modal"
        onRequestClose={() => setModalEditBanner(false)}
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="modal-container">
          <div className="modal-header">
            <span>Edição de Banner</span>
            <button
              className="btn-close-modal"
              onClick={() => {
                setModalEditBanner(false);
              }}
            >
              <FaTimes />
            </button>
          </div>
          <div className="modal-content">
            {banner ? (
              <div className="remove-banner">
                <img
                  src={previewBanner}
                  alt="Banner"
                  style={{ width: "100%" }}
                />
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
          </div>
          <div className="modal-footer">
            <button
              onClick={() => setModalEditBanner(false)}
              type="button"
              className="btn-primary btn-small btn-erro"
            >
              <span className="btn-label btn-label-small btn-erro-label">
                <FaTimes />
              </span>
              <span className="btn-text">Cancelar</span>
            </button>

            <button
              onClick={() => {
                updateBanner();
              }}
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
      </Modal>

      <Modal
        isOpen={modalEditImage}
        contentLabel="Rota para a API"
        className="modal"
        onRequestClose={() => setModalEditImage(false)}
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="modal-container">
          <div className="modal-header">
            <span>Edição de Image</span>
            <button
              className="btn-close-modal"
              onClick={() => {
                setModalEditImage(false);
              }}
            >
              <FaTimes />
            </button>
          </div>
          <div className="modal-content">
            {imagem ? (
              <div className="remove-banner">
                <img
                  src={previewPhoto}
                  alt="Banner"
                  style={{ width: "100%" }}
                  className="image-product"
                />
                <div>
                  <button
                    type="button"
                    className="remove-banner-button"
                    onClick={() => removePhoto()}
                  >
                    <FaTimes style={{ color: "#fff", fontSize: 25 }} />
                    {imagem.name}
                  </button>
                </div>
              </div>
            ) : (
              <label id="xmlFile">
                <input
                  type="file"
                  onChange={(event) => setImagem(event.target.files[0])}
                />
                <FaImages style={{ fontSize: 70, marginBottom: 20 }} />
                Clique aqui para adicionar uma foto para o produto
              </label>
            )}
          </div>
          <div className="modal-footer">
            <button
              onClick={() => setModalEditImage(false)}
              type="button"
              className="btn-primary btn-small btn-erro"
            >
              <span className="btn-label btn-label-small btn-erro-label">
                <FaTimes />
              </span>
              <span className="btn-text">Cancelar</span>
            </button>

            <button
              onClick={() => {
                updateImage();
              }}
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
      </Modal>
    </>
  );
}
