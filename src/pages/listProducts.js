import React, { useState, useEffect } from "react";
import { FaTags, FaHome, FaInfoCircle, FaTimes, FaCheck } from "react-icons/fa";
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
              Excluindo Produto, Aguarde...
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
            <span>Exclusão de Produtos</span>
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
    </>
  );
}
