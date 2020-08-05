import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaTshirt,
  FaSave,
  FaInfoCircle,
  FaImages,
  FaTimes,
  FaRulerHorizontal,
} from "react-icons/fa";
import Select from "react-select";
import api from "../configs/axios";
import Modal from "react-modal";
import Lottie from "react-lottie";

import successData from "../animations/success.json";
import errorData from "../animations/error.json";
import loadingData from "../animations/loading.json";

export default function Modelagem() {
  const [model, setModel] = useState(null);
  const [table, setTable] = useState(null);
  const [titleModel, setTitleModel] = useState("TÍTULO");
  const [descModel, setDescModel] = useState("DESCRIÇÃO");
  const [urlPhoto, setUrlPhoto] = useState("");
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState({});
  const [products, setProducts] = useState([]);

  const [models, setModels] = useState([]);
  const [tables, setTables] = useState([]);

  const [erroModal, setErroModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [messageErro, setErroMessage] = useState("");
  const [erroStatus, setErroStatus] = useState("");
  const [typeModal, setTypeModal] = useState("success");

  const previewModel = useMemo(() => {
    return model ? URL.createObjectURL(model) : null;
  }, [model]);

  const previewTable = useMemo(() => {
    return table ? URL.createObjectURL(table) : null;
  }, [table]);

  useEffect(() => {
    admin();
  }, []);

  async function admin() {
    setLoadingModal(true);
    await api
      .get("/findProducts")
      .then((response) => {
        setProducts(response.data.products);
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

  async function removeModel() {
    await URL.revokeObjectURL(model);
    setModel(null);
  }

  async function removeTable() {
    await URL.revokeObjectURL(table);
    setTable(null);
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
    data.append("id", productId);
    await api
      .post(`/saveModels`, data)
      .then((response) => {
        setLoadingModal(false);
        setErroStatus("Modelagem cadastrada com sucesso!");
        setTypeModal("success");
        setErroModal(true);
        setDescModel("DESCRIÇÃO");
        setTitleModel("TÍTULO");
        setModel(null);
        removeModel();
        searchModelagem(productId);
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
    data.append("id", productId);
    await api
      .post(`/saveTables`, data)
      .then((response) => {
        console.log(response);
        setLoadingModal(false);
        setErroStatus("Tabela cadastrada com sucesso!");
        setTypeModal("success");
        setErroModal(true);
        setTable(null);
        removeTable();
        searchModelagem(productId);
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

  async function searchModelagem(id) {
    setLoadingModal(true);
    await api
      .get(`/listModelagem/${id}`)
      .then((response) => {
        setUrlPhoto(response.data.urlImage);
        setModels(response.data.modelagem);
        setTables(response.data.tabela);
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

  function handleProduct(id) {
    setProductId(id.value);
    setProductName(id);
    searchModelagem(id.value);
  }

  const colorStyles = {
    option: (styles) => ({ ...styles, color: "#444" }),
  };

  async function removeModelagem(id) {
    setLoadingModal(true);
    await api
      .delete(`/delModelagem/${id}`)
      .then((response) => {
        setLoadingModal(false);
        setErroStatus(response.data.message);
        setTypeModal("success");
        setErroModal(true);
        searchModelagem(productId);
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

  async function removeTables(id) {
    setLoadingModal(true);
    await api
      .delete(`/delTabela/${id}`)
      .then((response) => {
        setLoadingModal(false);
        setErroStatus(response.data.message);
        setTypeModal("success");
        setErroModal(true);
        searchModelagem(productId);
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
          <FaRulerHorizontal style={{ marginRight: 20, fontSize: 20 }} />
          CADASTRO MODELAGEM DE PRODUTOS
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
              value={productName}
              placeholder="Selecione o Produto"
              onChange={(value) => handleProduct(value)}
              noOptionsMessage={() => <p>Nenhum produto cadastrado</p>}
              styles={colorStyles}
            />
          </div>
        </div>
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
                <div key={mod._id} style={{ width: "100%" }}>
                  <div className="medida-item">
                    <img
                      className="medida-img"
                      alt="Palmieri Uniformes"
                      src={`${urlPhoto}/${mod.image}`}
                    />
                    <h4 className="title-medida-product">{mod.title}</h4>
                    <p className="desc-medida-product">{mod.desc}</p>
                  </div>
                  <div className="container-button-card-catalog">
                    <button
                      onClick={() => removeModelagem(mod._id)}
                      type="button"
                      className={"btn-red"}
                    >
                      <FaTimes />
                      <span className="btn-text">Excluir</span>
                    </button>
                  </div>
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
                Clique aqui para adicionar uma imagem da modelagem do produto
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
                <div style={{ width: "100%" }} key={tab._id}>
                  <div className="medida-grid-table-item">
                    <img
                      alt="Palmieri Uniformes"
                      src={`${urlPhoto}/${tab.image}`}
                      className="image-table"
                    />
                  </div>
                  <div className="container-button-card-catalog">
                    <button
                      onClick={() => removeTables(tab._id)}
                      type="button"
                      className={"btn-red"}
                    >
                      <FaTimes />
                      <span className="btn-text">Excluir</span>
                    </button>
                  </div>
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
                Clique aqui para adicionar uma imagem da tabela de tamanhos do
                produto
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
