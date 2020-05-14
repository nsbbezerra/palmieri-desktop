import React, { useState, useMemo } from "react";
import {
  FaHome,
  FaIdCardAlt,
  FaImages,
  FaInfoCircle,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SavePartners() {
  const [imageFunc, setImageFunc] = useState(null);
  const [name, setName] = useState("NOME");
  const [func, setFunct] = useState("Função...");

  const previewImage = useMemo(() => {
    return imageFunc ? URL.createObjectURL(imageFunc) : null;
  }, [imageFunc]);

  async function removeImageFunc() {
    await URL.revokeObjectURL(imageFunc);
    setImageFunc(null);
  }

  return (
    <>
      <div className="header-component">
        <div className="header-left">
          <FaIdCardAlt style={{ marginRight: 20, fontSize: 20 }} />
          CADASTRO DE FUNCIONÁRIOS
        </div>
        <div>
          <Link to="/" className="link-to-home">
            <FaHome />
          </Link>
        </div>
      </div>

      <div className="content-page">
        <div className="grid-products-save">
          <div>
            <span className="label">Visualização do Card</span>
            <div className="card-product">
              {!imageFunc ? (
                <div className="card-image-icon">
                  <FaImages
                    style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                  />
                </div>
              ) : (
                <img className="card-image" alt="Imagem" src={previewImage} />
              )}
              <div className="card-title">{name}</div>
              <div className="card-content-func">{func}</div>
            </div>
          </div>
          <div className="container-info">
            <span className="title-container-info">
              <FaInfoCircle style={{ marginRight: 15 }} />
              INFORMAÇÕES DO FUNCIONÁRIO
            </span>
            <div className="grid-products-info">
              {imageFunc ? (
                <button
                  className="remove-img"
                  onClick={() => removeImageFunc()}
                  type="button"
                >
                  <FaTimes style={{ fontSize: 50, color: "#f44336" }} />
                  <p>{imageFunc.name}</p>
                </button>
              ) : (
                <label id="photoFile">
                  <input
                    type="file"
                    onChange={(event) => setImageFunc(event.target.files[0])}
                  />
                  <FaImages style={{ fontSize: 30, marginBottom: 20 }} />
                  Clique aqui para adicionar a foto do funcionário
                </label>
              )}
              <div>
                <div>
                  <span className="label">
                    Nome do Funcionário
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
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                    value={name}
                    maxLength={24}
                  />
                  <span className="label">
                    Função
                    <span
                      style={{
                        fontWeight: 400,
                        fontStyle: "italic",
                        color: "#777",
                        marginLeft: 15,
                        fontSize: 11,
                      }}
                    >
                      Máx. 35 caracteres
                    </span>
                  </span>
                  <input
                    type="text"
                    className="input-text"
                    onChange={(e) => setFunct(e.target.value)}
                    value={func}
                    maxLength={35}
                  />
                </div>
              </div>
            </div>
            <hr className="divider" />
            <div className="container-buttons">
              <button onClick={() => {}} type="button" className="btn-primary">
                <span className="btn-label">
                  <FaSave />
                </span>
                <span className="btn-text">Cadastrar Funcionário</span>
              </button>
            </div>
          </div>
        </div>

        <div className="cards-row">
          <div className="card-product" style={{ marginRight: "15px" }}>
            {!imageFunc ? (
              <div className="card-image-icon">
                <FaImages
                  style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                />
              </div>
            ) : (
              <img className="card-image" alt="Imagem" src={previewImage} />
            )}
            <div className="card-title">{name}</div>
            <div className="card-content-func">{func}</div>
          </div>
          <div className="card-product" style={{ marginRight: "15px" }}>
            {!imageFunc ? (
              <div className="card-image-icon">
                <FaImages
                  style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                />
              </div>
            ) : (
              <img className="card-image" alt="Imagem" src={previewImage} />
            )}
            <div className="card-title">{name}</div>
            <div className="card-content-func">{func}</div>
          </div>
          <div className="card-product" style={{ marginRight: "15px" }}>
            {!imageFunc ? (
              <div className="card-image-icon">
                <FaImages
                  style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                />
              </div>
            ) : (
              <img className="card-image" alt="Imagem" src={previewImage} />
            )}
            <div className="card-title">{name}</div>
            <div className="card-content-func">{func}</div>
          </div>
          <div className="card-product" style={{ marginRight: "15px" }}>
            {!imageFunc ? (
              <div className="card-image-icon">
                <FaImages
                  style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                />
              </div>
            ) : (
              <img className="card-image" alt="Imagem" src={previewImage} />
            )}
            <div className="card-title">{name}</div>
            <div className="card-content-func">{func}</div>
          </div>
          <div className="card-product" style={{ marginRight: "15px" }}>
            {!imageFunc ? (
              <div className="card-image-icon">
                <FaImages
                  style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                />
              </div>
            ) : (
              <img className="card-image" alt="Imagem" src={previewImage} />
            )}
            <div className="card-title">{name}</div>
            <div className="card-content-func">{func}</div>
          </div>
        </div>
      </div>
    </>
  );
}
