import React, { useState, useMemo } from "react";
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

export default function SavePages() {
  const [photoCards, setPhotoCards] = useState(null);
  const [descriptionCard, setDescriptionCard] = useState("Descrição...");
  const [titleCard, setTitleCard] = useState("GOLA");
  const [typeFirtsPart, setTypeFirsPart] = useState("images");
  const [typeTecido, setTypeTecido] = useState("images");
  const [colorHeader, setColorHeader] = useState("000");
  const [colorTextHeader, setColorTextHeader] = useState("fff");
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [titleTecido, setTitleTecido] = useState("Título");
  const [descriptionTecido, setDescriptionTecido] = useState("Descrição");
  const [firstItem, setFirstItem] = useState(false);
  const [comments, setComments] = useState(null);

  const previewPhotoCards = useMemo(() => {
    return photoCards ? URL.createObjectURL(photoCards) : null;
  }, [photoCards]);

  const previewImageOne = useMemo(() => {
    return imageOne ? URL.createObjectURL(imageOne) : null;
  }, [imageOne]);

  const previewImageTwo = useMemo(() => {
    return imageTwo ? URL.createObjectURL(imageTwo) : null;
  }, [imageTwo]);

  const previewComments = useMemo(() => {
    return comments ? URL.createObjectURL(comments) : null;
  }, [comments]);

  async function removePhotoCard() {
    await URL.revokeObjectURL(photoCards);
    setPhotoCards(null);
  }

  async function removeImageOne() {
    await URL.revokeObjectURL(imageOne);
    setImageOne(null);
  }

  async function removeImageTwo() {
    await URL.revokeObjectURL(imageTwo);
    setImageTwo(null);
  }

  async function removeComments() {
    await URL.revokeObjectURL(comments);
    setComments(null);
  }

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
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
            <Select options={options} placeholder="Selecione o Produto" />
          </div>
        </div>
        <div className="title-page-two">
          <div className="header-left">
            <FaTags style={{ marginRight: 20 }} />
            DEMONSTRATIVO DE PRODUTOS (Parte inicial da página)
          </div>
          <div className="radio-container">
            <input
              value="images"
              type="radio"
              id="radio-one"
              name="first-part"
              onChange={(e) => setTypeFirsPart(e.target.value)}
              checked={typeFirtsPart === "images" ? true : false}
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
            />
            <label className="radio-label" htmlFor="radio-two">
              Cards Personalizados
            </label>
            <button
              onClick={() => {}}
              type="button"
              className="btn-white btn-small"
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
              <div className="card-product-two">
                <div
                  className="card-header"
                  style={{
                    backgroundColor: `#${colorHeader}`,
                    color: `#${colorTextHeader}`,
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
                        maxLength={6}
                      />
                    </div>
                    <div>
                      <span className="label">Cor do Texto (RGB)</span>
                      <input
                        type="text"
                        className="input-text"
                        onChange={(e) => setColorTextHeader(e.target.value)}
                        value={colorTextHeader}
                        maxLength={6}
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
                  onClick={() => {}}
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
                  onClick={() => {}}
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
            />
            <label className="radio-label" htmlFor="radio-four">
              Listas
            </label>
            <button
              onClick={() => {}}
              type="button"
              className="btn-white btn-small"
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
              {imageTwo ? (
                <img
                  src={previewImageTwo}
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
                      Clique aqui para adicionar a primeira imagem dos tecidos
                    </label>
                  )}
                  <button
                    onClick={() => {}}
                    type="button"
                    className="btn-primary btn-small"
                    style={{ marginTop: 10 }}
                  >
                    <span className="btn-label btn-label-small">
                      <FaSave />
                    </span>
                    <span className="btn-text">Salvar Primeira Imagem</span>
                  </button>
                </div>
                <div>
                  {imageTwo ? (
                    <button
                      className="remove-img"
                      onClick={() => removeImageTwo()}
                      type="button"
                    >
                      <FaTimes style={{ fontSize: 50, color: "#f44336" }} />
                      <p>{imageTwo.name}</p>
                    </button>
                  ) : (
                    <label id="photoFile">
                      <input
                        type="file"
                        onChange={(event) => setImageTwo(event.target.files[0])}
                      />
                      <FaImages style={{ fontSize: 30, marginBottom: 20 }} />
                      Clique aqui para adicionar a segunda imagem dos tecidos
                    </label>
                  )}
                  <button
                    onClick={() => {}}
                    type="button"
                    className="btn-primary btn-small"
                    style={{ marginTop: 10 }}
                  >
                    <span className="btn-label btn-label-small">
                      <FaSave />
                    </span>
                    <span className="btn-text">Salvar Segunda Imagem</span>
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
              <div
                className={
                  firstItem === true ? "content-tecido-one" : "content-tecido"
                }
              >
                <h1 className="title-master-tecido">Opções de Malhas</h1>
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
                  onClick={() => {}}
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
              onClick={() => {}}
              type="button"
              className="btn-primary btn-small"
              style={{ marginTop: 10 }}
            >
              <span className="btn-label btn-label-small">
                <FaSave />
              </span>
              <span className="btn-text">Salvar Comentário</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
