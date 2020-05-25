import React, { useState, useMemo, useEffect } from "react";
import {
  FaHome,
  FaPager,
  FaTags,
  FaTshirt,
  FaSave,
  FaImages,
  FaTimes,
  FaInfoCircle,
  FaCircle,
  FaComment,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Select from "react-select";
import Modal from "react-modal";
import Lottie from "react-lottie";
import successData from "../animations/success.json";
import errorData from "../animations/error.json";
import loadingData from "../animations/loading.json";
import api from "../configs/axios";

export default function SavePages() {
  const [photoCards, setPhotoCards] = useState(null);
  const [descriptionCard, setDescriptionCard] = useState("Descrição...");
  const [titleCard, setTitleCard] = useState("TÍTULO");
  const [typeFirtsPart, setTypeFirsPart] = useState("");
  const [typeTecido, setTypeTecido] = useState("");
  const [colorHeader, setColorHeader] = useState("#000");
  const [colorTextHeader, setColorTextHeader] = useState("#fff");
  const [imageOne, setImageOne] = useState(null);
  const [titleTecido, setTitleTecido] = useState("Título");
  const [descriptionTecido, setDescriptionTecido] = useState("Descrição");
  const [firstItem, setFirstItem] = useState(false);
  const [comments, setComments] = useState(null);
  const [products, setProducts] = useState([]);
  const [productSelect, setProductSelect] = useState({});
  const [idProduct, setIdProduct] = useState("");
  const [disabledFirstPart, setDisabledFirstPart] = useState(false);
  const [disabledDetailsPart, setDisabledDetailsPart] = useState(false);
  const [firstPartLists, setFirstPartLists] = useState([]);
  const [firstPartCards, setFirstPartCards] = useState([]);
  const [urlPhoto, setUrlPhoto] = useState("");
  const [imagesDetails, setImagesDetails] = useState([]);
  const [detailsLists, setDetailsLists] = useState([]);
  const [commentsProd, setCommentsProd] = useState([]);

  const [erroModal, setErroModal] = useState(false);
  const [messageErro, setErroMessage] = useState("");
  const [erroStatus, setErroStatus] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingFind, setLoadingFind] = useState(false);

  const previewPhotoCards = useMemo(() => {
    return photoCards ? URL.createObjectURL(photoCards) : null;
  }, [photoCards]);

  const previewImageOne = useMemo(() => {
    return imageOne ? URL.createObjectURL(imageOne) : null;
  }, [imageOne]);

  const previewComments = useMemo(() => {
    return comments ? URL.createObjectURL(comments) : null;
  }, [comments]);

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

  async function removePhotoCard() {
    await URL.revokeObjectURL(photoCards);
    setPhotoCards(null);
  }

  async function removeImageOne() {
    await URL.revokeObjectURL(imageOne);
    setImageOne(null);
  }

  async function removeComments() {
    await URL.revokeObjectURL(comments);
    setComments(null);
  }

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
    productFinder(info.value);
  }

  async function productFinder(id) {
    setLoadingFind(true);
    await api
      .get(`/productsFind/${id}`)
      .then((response) => {
        if (response.data.product.firsPartOpt) {
          setTypeFirsPart(response.data.product.firsPartOpt);
          setDisabledFirstPart(true);
        } else {
          setTypeFirsPart("");
        }
        if (response.data.product.lists.length) {
          setFirstPartLists(response.data.product.lists);
        } else {
          setFirstPartLists([]);
        }
        if (response.data.product.cards.length) {
          setFirstPartCards(response.data.product.cards);
        } else {
          setFirstPartCards([]);
        }
        if (response.data.product.detailsOpt) {
          setTypeTecido(response.data.product.detailsOpt);
          setDisabledDetailsPart(true);
        } else {
          setTypeTecido("");
        }
        if (response.data.product.detailsImage.length) {
          setImagesDetails(response.data.product.detailsImage);
        } else {
          setImagesDetails([]);
        }
        if (response.data.product.detailsLists.length) {
          setDetailsLists(response.data.product.detailsLists);
        } else {
          setDetailsLists([]);
        }
        if (response.data.product.comments.length) {
          setCommentsProd(response.data.product.comments);
        } else {
          setCommentsProd([]);
        }
        setUrlPhoto(response.data.urlPhoto);
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

  async function firstPartConfig() {
    if (idProduct === "") {
      setErroStatus("Erro ao salvar a configuração");
      setErroMessage("Selecione um produto");
      setErroModal(true);
      return false;
    }
    setLoading(true);
    await api
      .put(`/pagesConfig/${idProduct}`, {
        firsPartOpt: typeFirtsPart,
      })
      .then((response) => {
        setSuccessMessage(response.data.message);
        setLoading(false);
        productFinder(idProduct);
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

  async function secondPartConfig() {
    if (idProduct === "") {
      setErroStatus("Erro ao salvar a configuração");
      setErroMessage("Selecione um produto");
      setErroModal(true);
      return false;
    }
    setLoading(true);
    await api
      .put(`/detailsConfig/${idProduct}`, {
        detailsOpt: typeTecido,
      })
      .then((response) => {
        setSuccessMessage(response.data.message);
        setLoading(false);
        productFinder(idProduct);
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

  async function saveFirtsPartLists() {
    if (idProduct === "") {
      setErroStatus("Erro ao salvar a lista");
      setErroMessage("Selecione um produto");
      setErroModal(true);
      return false;
    }
    if (titleCard === "TÍTULO") {
      setErroStatus("Erro ao salvar a lista");
      setErroMessage("Insira um título para o produto");
      setErroModal(true);
      return false;
    }
    if (descriptionCard === "Descrição...") {
      setErroStatus("Erro ao salvar a lista");
      setErroMessage("Insira uma descrição para o produto");
      setErroModal(true);
      return false;
    }
    if (photoCards === null) {
      setErroStatus("Erro ao salvar a lista");
      setErroMessage("Insira uma foto para o produto");
      setErroModal(true);
      return false;
    }
    setLoading(true);
    let data = new FormData();
    data.append("listImage", photoCards);
    data.append("title", titleCard);
    data.append("description", descriptionCard);
    await api
      .put(`/saveLists/${idProduct}`, data)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setLoading(false);
        setSuccessModal(true);
        setTitleCard("TÍTULO");
        setDescriptionCard("Descrição...");
        removePhotoCard();
        productFinder(idProduct);
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

  async function saveCardFirstPart() {
    if (idProduct === "") {
      setErroStatus("Erro ao salvar a lista");
      setErroMessage("Selecione um produto");
      setErroModal(true);
      return false;
    }
    if (titleCard === "TÍTULO") {
      setErroStatus("Erro ao salvar a lista");
      setErroMessage("Insira um título para o produto");
      setErroModal(true);
      return false;
    }
    if (descriptionCard === "Descrição...") {
      setErroStatus("Erro ao salvar a lista");
      setErroMessage("Insira uma descrição para o produto");
      setErroModal(true);
      return false;
    }
    if (photoCards === null) {
      setErroStatus("Erro ao salvar a lista");
      setErroMessage("Insira uma foto para o produto");
      setErroModal(true);
      return false;
    }
    setLoading(true);
    let data = new FormData();
    data.append("cardImage", photoCards);
    data.append("header", titleCard);
    data.append("description", descriptionCard);
    data.append("color", colorTextHeader);
    data.append("bg", colorHeader);
    await api
      .put(`/saveCards/${idProduct}`, data)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setLoading(false);
        setSuccessModal(true);
        setTitleCard("TÍTULO");
        setDescriptionCard("Descrição...");
        setColorHeader("#fff");
        setColorHeader("#000");
        removePhotoCard();
        productFinder(idProduct);
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

  async function saveDetailsImage() {
    if (imageOne === null) {
      setErroStatus("Erro ao salvar a imagem");
      setErroMessage("Insira uma image para o produto");
      setErroModal(true);
      return false;
    }
    setLoading(true);
    let data = new FormData();
    data.append("detailsImage", imageOne);
    await api
      .put(`/saveDetailsImage/${idProduct}`, data)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setLoading(false);
        setSuccessModal(true);
        removeImageOne();
        productFinder(idProduct);
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
          if (error.response.data.erro.message) {
            setErroStatus(error.response.data.erro.message);
          } else {
            setErroStatus("Limite de Upload de Imagens Excedido");
          }
          if (error.response.data.erro.type) {
            setErroMessage(error.response.data.erro.type);
          } else {
            setErroMessage("Limite Atingido");
          }
          setErroModal(true);
          setLoading(false);
        }
      });
  }

  async function saveDetailsList() {
    if (titleTecido === "Título") {
      setErroStatus("Erro ao salvar a lista");
      setErroMessage("Insira um título para a lista");
      setErroModal(true);
      return false;
    }
    if (descriptionTecido === "Descrição") {
      setErroStatus("Erro ao salvar a lista");
      setErroMessage("Insira uma descrição para a lista");
      setErroModal(true);
      return false;
    }
    setLoading(true);
    await api
      .put(`/saveDetailsList/${idProduct}`, {
        title: titleTecido,
        description: descriptionTecido,
        firstItem: firstItem,
      })
      .then((response) => {
        setSuccessMessage(response.data.message);
        setLoading(false);
        setSuccessModal(true);
        setTitleTecido("Título");
        setDescriptionTecido("Descrição");
        setFirstItem(false);
        productFinder(idProduct);
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
          if (error.response.data.erro.message) {
            setErroStatus(error.response.data.erro.message);
          } else {
            setErroStatus("Ocorreu um erro ao salvar a lista");
          }
          if (error.response.data.erro.type) {
            setErroMessage(error.response.data.erro.type);
          } else {
            setErroMessage(error.response.data.erro);
          }
          setErroModal(true);
          setLoading(false);
        }
      });
  }

  async function saveComents() {
    if (comments === null) {
      setErroStatus("Erro ao salvar comentário");
      setErroMessage("Insira uma foto do comentário");
      setErroModal(true);
      return false;
    }
    setLoading(true);
    let data = new FormData();
    data.append("comments", comments);
    await api
      .put(`/saveComments/${idProduct}`, data)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setLoading(false);
        removeComments();
        productFinder(idProduct);
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
          <FaPager style={{ marginRight: 20, fontSize: 20 }} />
          CADASTRO DE PÁGINAS DE PRODUTOS
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
            />
          </div>
        </div>
        <div className="title-page-two">
          <div className="header-left">
            <FaTags style={{ marginRight: 20 }} />
            DEMONSTRATIVO DE PRODUTOS (Parte inicial da página)
          </div>
          <div className="radio-container">
            <input
              value="lists"
              type="radio"
              id="radio-one"
              name="first-part"
              onChange={(e) => setTypeFirsPart(e.target.value)}
              checked={typeFirtsPart === "lists" ? true : false}
              disabled={disabledFirstPart}
            />
            <label className="radio-label" htmlFor="radio-one">
              Imagens com Descrição
            </label>

            <input
              value="cards"
              type="radio"
              id="radio-two"
              name="first-part"
              onChange={(e) => setTypeFirsPart(e.target.value)}
              checked={typeFirtsPart === "cards" ? true : false}
              disabled={disabledFirstPart}
            />
            <label className="radio-label" htmlFor="radio-two">
              Cards Personalizados
            </label>
            <button
              onClick={() => firstPartConfig()}
              type="button"
              className="btn-white btn-small"
              disabled={disabledFirstPart}
            >
              <span className="btn-label-white btn-label-small">
                <FaSave />
              </span>
              <span className="btn-text">Salvar Configuração</span>
            </button>
          </div>
        </div>
        {/* /** CADASTRO DA PRIMEIRA PARTE DO SITE: CARDS */}
        {typeFirtsPart === "cards" ? (
          <>
            <span className="title-container-info">EXEMPLOS DOS CARDS</span>
            <div className="cards-row">
              {firstPartCards.length ? (
                <>
                  {firstPartCards.map((car) => (
                    <div className="card-product-two" key={car._id}>
                      <div
                        className="card-header"
                        style={{
                          backgroundColor: `${car.bg}`,
                          color: `${car.color}`,
                        }}
                      >
                        {car.header}
                      </div>
                      <img
                        className="card-product-img"
                        alt="Imagem"
                        src={`${urlPhoto}/${car.image}`}
                      />
                      <div className="card-content-two">{car.description}</div>
                    </div>
                  ))}
                </>
              ) : (
                ""
              )}
              <div className="card-product-two">
                <div
                  className="card-header"
                  style={{
                    backgroundColor: `${colorHeader}`,
                    color: `${colorTextHeader}`,
                  }}
                >
                  {titleCard}
                </div>
                {!photoCards ? (
                  <div className="card-image-icon">
                    <FaImages
                      style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                    />
                  </div>
                ) : (
                  <img
                    className="card-product-img"
                    alt="Imagem"
                    src={previewPhotoCards}
                  />
                )}
                <div className="card-content-two">{descriptionCard}</div>
              </div>
            </div>
            <div className="container-info">
              <span className="title-container-info">
                <FaInfoCircle style={{ marginRight: 15 }} />
                INFORMAÇÕES DO PRODUTO
              </span>
              <div className="grid-products-info">
                {photoCards ? (
                  <button
                    className="remove-img"
                    onClick={() => removePhotoCard()}
                    type="button"
                  >
                    <FaTimes style={{ fontSize: 50, color: "#f44336" }} />
                    <p>{photoCards.name}</p>
                  </button>
                ) : (
                  <label id="photoFile">
                    <input
                      type="file"
                      onChange={(event) => setPhotoCards(event.target.files[0])}
                    />
                    <FaImages style={{ fontSize: 30, marginBottom: 20 }} />
                    Clique aqui para adicionar a foto do produto
                  </label>
                )}
                <div>
                  <div className="grid-cards-row">
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
                        onChange={(e) =>
                          setTitleCard(e.target.value.toUpperCase())
                        }
                        value={titleCard}
                        maxLength={24}
                      />
                    </div>
                    <div>
                      <span className="label">Cor do Cabeçalho (RGB)</span>
                      <input
                        type="text"
                        className="input-text"
                        onChange={(e) => setColorHeader(e.target.value)}
                        value={colorHeader}
                        maxLength={7}
                      />
                    </div>
                    <div>
                      <span className="label">Cor do Texto (RGB)</span>
                      <input
                        type="text"
                        className="input-text"
                        onChange={(e) => setColorTextHeader(e.target.value)}
                        value={colorTextHeader}
                        maxLength={7}
                      />
                    </div>
                  </div>
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
                    onChange={(e) => setDescriptionCard(e.target.value)}
                    value={descriptionCard}
                    maxLength={250}
                  />
                </div>
              </div>
              <hr className="divider" />
              <div className="container-buttons">
                <button
                  onClick={() => saveCardFirstPart()}
                  type="button"
                  className="btn-primary"
                >
                  <span className="btn-label">
                    <FaSave />
                  </span>
                  <span className="btn-text">Salvar Card</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="title-container-info">
              EXEMPLOS DAS IMAGENS COM DESCRIÇÃO
            </span>
            <div className="cards-row">
              {firstPartLists.length ? (
                <>
                  {firstPartLists.map((lis) => (
                    <div className="card-product-two" key={lis._id}>
                      <img
                        className="card-product"
                        alt="Imagem"
                        src={`${urlPhoto}/${lis.image}`}
                      />
                      <div className="card-title">{lis.title}</div>
                      <div className="card-content">{lis.description}</div>
                    </div>
                  ))}
                </>
              ) : (
                ""
              )}
              <div className="card-product-two">
                {!photoCards ? (
                  <div className="card-image-icon">
                    <FaImages
                      style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                    />
                  </div>
                ) : (
                  <img
                    className="card-product"
                    alt="Imagem"
                    src={previewPhotoCards}
                  />
                )}
                <div className="card-title">{titleCard}</div>
                <div className="card-content">{descriptionCard}</div>
              </div>
            </div>
            <div className="container-info">
              <span className="title-container-info">
                <FaInfoCircle style={{ marginRight: 15 }} />
                INFORMAÇÕES DO PRODUTO
              </span>
              <div className="grid-products-info">
                {photoCards ? (
                  <button
                    className="remove-img"
                    onClick={() => removePhotoCard()}
                    type="button"
                  >
                    <FaTimes style={{ fontSize: 50, color: "#f44336" }} />
                    <p>{photoCards.name}</p>
                  </button>
                ) : (
                  <label id="photoFile">
                    <input
                      type="file"
                      onChange={(event) => setPhotoCards(event.target.files[0])}
                    />
                    <FaImages style={{ fontSize: 30, marginBottom: 20 }} />
                    Clique aqui para adicionar a foto do produto
                  </label>
                )}
                <div>
                  <span className="label">
                    Título do Card
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
                    onChange={(e) => setTitleCard(e.target.value.toUpperCase())}
                    value={titleCard}
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
                    onChange={(e) => setDescriptionCard(e.target.value)}
                    value={descriptionCard}
                    maxLength={250}
                  />
                </div>
              </div>
              <hr className="divider" />
              <div className="container-buttons">
                <button
                  onClick={() => saveFirtsPartLists()}
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
          </>
        )}

        <div className="title-page-two">
          <div className="header-left">
            <FaTshirt style={{ marginRight: 20 }} />
            DEMONTRATIVO DOS TECIDOS (Parte do Meio do Site)
          </div>
          <div className="radio-container">
            <input
              value="images"
              type="radio"
              id="radio-three"
              name="second-part"
              onChange={(e) => setTypeTecido(e.target.value)}
              checked={typeTecido === "images" ? true : false}
              disabled={disabledDetailsPart}
            />
            <label className="radio-label" htmlFor="radio-three">
              Imagens
            </label>

            <input
              value="lists"
              type="radio"
              id="radio-four"
              name="second-part"
              onChange={(e) => setTypeTecido(e.target.value)}
              checked={typeTecido === "lists" ? true : false}
              disabled={disabledDetailsPart}
            />
            <label className="radio-label" htmlFor="radio-four">
              Listas
            </label>
            <button
              onClick={() => secondPartConfig()}
              type="button"
              className="btn-white btn-small"
              disabled={disabledDetailsPart}
            >
              <span className="btn-label-white btn-label-small">
                <FaSave />
              </span>
              <span className="btn-text">Salvar Configuração</span>
            </button>
          </div>
        </div>

        {typeTecido === "images" ? (
          <>
            <span className="title-container-info">EXEMPLOS DE IMAGENS</span>

            <div className="jumbotron">
              {imagesDetails.length ? (
                <>
                  {imagesDetails.map((imgDet) => (
                    <img
                      src={`${urlPhoto}/${imgDet.image}`}
                      style={{ width: "100%" }}
                      alt="ImagesOne"
                      key={imgDet._id}
                    />
                  ))}
                </>
              ) : (
                ""
              )}
              {imagesDetails.length <= 1 ? (
                <>
                  {imageOne ? (
                    <img
                      src={previewImageOne}
                      style={{ width: "100%" }}
                      alt="ImagesOne"
                    />
                  ) : (
                    <div className="card-image-icon">
                      <FaImages
                        style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                      />
                    </div>
                  )}
                </>
              ) : (
                ""
              )}
            </div>

            <div className="container-info">
              <span className="title-container-info">
                <FaInfoCircle style={{ marginRight: 15 }} />
                INFORMAÇÕES DO PRODUTO
              </span>
              <div className="containter-image-info-tecido">
                <div>
                  {imageOne ? (
                    <button
                      className="remove-img"
                      onClick={() => removeImageOne()}
                      type="button"
                    >
                      <FaTimes style={{ fontSize: 50, color: "#f44336" }} />
                      <p>{imageOne.name}</p>
                    </button>
                  ) : (
                    <label id="photoFile">
                      <input
                        type="file"
                        onChange={(event) => setImageOne(event.target.files[0])}
                      />
                      <FaImages style={{ fontSize: 30, marginBottom: 20 }} />
                      Clique aqui para adicionar uma imagem dos tecidos
                    </label>
                  )}
                  <button
                    onClick={() => saveDetailsImage()}
                    type="button"
                    className="btn-primary"
                    style={{ marginTop: 10 }}
                  >
                    <span className="btn-label">
                      <FaSave />
                    </span>
                    <span className="btn-text">Salvar Imagem</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="title-container-info">
              EXEMPLOS DE LISTA DE TECIDOS
            </span>
            <div className="container-tecido">
              <h1 className="title-master-tecido">Opções de Malhas</h1>
              {detailsLists.length ? (
                <>
                  {detailsLists.map((detLis) => (
                    <div
                      className={
                        detLis.firstItem === true
                          ? "content-tecido-one"
                          : "content-tecido"
                      }
                      key={detLis._id}
                    >
                      <span className="title-tecido">
                        <FaCircle
                          style={{ marginRight: "15px", fontSize: "35px" }}
                        />
                        {detLis.title}
                      </span>
                      <div className="container-info-tecido">
                        <span className="info-tecido">
                          {detLis.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                ""
              )}
              <div
                className={
                  firstItem === true ? "content-tecido-one" : "content-tecido"
                }
              >
                <span className="title-tecido">
                  <FaCircle style={{ marginRight: "15px", fontSize: "35px" }} />
                  {titleTecido}
                </span>
                <div className="container-info-tecido">
                  <span className="info-tecido">{descriptionTecido}</span>
                </div>
              </div>
            </div>

            <div className="container-info">
              <span className="title-container-info">
                <FaInfoCircle style={{ marginRight: 15 }} />
                INFORMAÇÕES DO PRODUTO
              </span>
              <div className="grid-products-info">
                <div>
                  <span className="label">Primeiro Item?</span>
                  <div className="radio-container">
                    <input
                      type="radio"
                      id="radio-five"
                      name="first-item"
                      onChange={() => setFirstItem(true)}
                      checked={firstItem === true ? true : false}
                    />
                    <label className="radio-label" htmlFor="radio-five">
                      Sim
                    </label>

                    <input
                      type="radio"
                      id="radio-six"
                      name="first-item"
                      onChange={() => setFirstItem(false)}
                      checked={firstItem === false ? true : false}
                    />
                    <label className="radio-label" htmlFor="radio-six">
                      Não
                    </label>
                  </div>
                </div>
                <div>
                  <span className="label">
                    Título do Tecido
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
                  <input
                    type="text"
                    className="input-text"
                    onChange={(e) => setTitleTecido(e.target.value)}
                    value={titleTecido}
                    maxLength={250}
                  />
                  <span className="label">Descrição do Tecido</span>
                  <textarea
                    type="text"
                    className="text-area-two"
                    style={{ height: 55 }}
                    onChange={(e) => setDescriptionTecido(e.target.value)}
                    value={descriptionTecido}
                    maxLength={500}
                    rows={7}
                  />
                </div>
              </div>
              <hr className="divider" />
              <div className="container-buttons">
                <button
                  onClick={() => saveDetailsList()}
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
          </>
        )}

        <div className="title-page-two">
          <div className="header-left">
            <FaComment style={{ marginRight: 20 }} />
            CADASTRAR COMENTÁRIOS
          </div>
        </div>

        <span className="title-container-info">EXEMPLOS DE COMENTÁRIOS</span>

        <div className="cards-row">
          {commentsProd.length ? (
            <>
              {commentsProd.map((comm) => (
                <img
                  src={`${urlPhoto}/${comm.image}`}
                  style={{
                    width: "500px",
                    marginRight: "15px",
                    borderRadius: "3px",
                    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
                  }}
                  alt="Coments"
                  key={comm._id}
                />
              ))}
            </>
          ) : (
            ""
          )}
          {comments ? (
            <img
              src={previewComments}
              style={{
                width: "500px",
                marginRight: "15px",
                borderRadius: "3px",
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
              }}
              alt="Coments"
            />
          ) : (
            <>
              <div
                style={{
                  width: "550px",
                  height: "110px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  borderRadius: "3px",
                  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <FaComment style={{ fontSize: 70 }} />
              </div>
            </>
          )}
        </div>

        <div className="container-info">
          <span className="title-container-info">
            <FaInfoCircle style={{ marginRight: 15 }} />
            INFORMAÇÕES DO PRODUTO
          </span>
          <div style={{ marginTop: "10px" }}>
            {comments ? (
              <button
                className="remove-img"
                onClick={() => removeComments()}
                type="button"
              >
                <FaTimes style={{ fontSize: 50, color: "#f44336" }} />
                <p>{comments.name}</p>
              </button>
            ) : (
              <label id="photoFile">
                <input
                  type="file"
                  onChange={(event) => setComments(event.target.files[0])}
                />
                <FaImages style={{ fontSize: 30, marginBottom: 20 }} />
                Clique aqui para adicionar uma foto do comentário
              </label>
            )}
            <button
              onClick={() => saveComents()}
              type="button"
              className="btn-primary"
              style={{ marginTop: 10 }}
            >
              <span className="btn-label">
                <FaSave />
              </span>
              <span className="btn-text">Salvar Comentário</span>
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
            <span>Cadastro de Páginas</span>
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
            <span>Cadastro de Páginas</span>
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
              Guardando Informações, Aguarde...
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
    </>
  );
}
