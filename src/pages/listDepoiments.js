import React, { useState, useMemo } from "react";
import {
  FaHome,
  FaRocketchat,
  FaImages,
  FaTimes,
  FaVideo,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import icone from "../assets/icone.svg";
import logo from "../assets/logo.svg";

export default function ListDepoiments() {
  const [titleDepoimet, setTitleDepoiment] = useState("Título");
  const [imageDepoiment, setImageDepoiment] = useState(null);

  const previewImage = useMemo(() => {
    return imageDepoiment ? URL.createObjectURL(imageDepoiment) : null;
  }, [imageDepoiment]);

  return (
    <>
      <div className="header-component">
        <div className="header-left">
          <FaRocketchat style={{ marginRight: 20, fontSize: 20 }} />
          LISTAGEM DE DEPOIMENTOS
        </div>
        <div>
          <Link to="/" className="link-to-home">
            <FaHome />
          </Link>
        </div>
      </div>

      <div className="content-page" style={{ marginTop: 80 }}>
        <div className="used-container">
          <div className="used-item">
            <button className="btn-badge">
              <FaTimes />
            </button>
            <div className="item-img">
              {!imageDepoiment ? (
                <div className="card-image-icon">
                  <FaImages
                    style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                  />
                </div>
              ) : (
                <img
                  className="img-item-used"
                  alt="Imagem"
                  src={previewImage}
                />
              )}
            </div>
            <div className="item-desc">
              <div className="logo-container-used">
                <img src={icone} alt="icone" className="icone-used" />
                <img src={logo} alt="logo" className="logo-used" />
              </div>
              <span className="used-description">{titleDepoimet}</span>
            </div>
          </div>

          <div className="used-item">
            <button className="btn-badge">
              <FaTimes />
            </button>
            <div className="item-img">
              {!imageDepoiment ? (
                <div className="card-image-icon">
                  <FaImages
                    style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                  />
                </div>
              ) : (
                <img
                  className="img-item-used"
                  alt="Imagem"
                  src={previewImage}
                />
              )}
            </div>
            <div className="item-desc">
              <div className="logo-container-used">
                <img src={icone} alt="icone" className="icone-used" />
                <img src={logo} alt="logo" className="logo-used" />
              </div>
              <span className="used-description">{titleDepoimet}</span>
            </div>
          </div>

          <div className="used-item">
            <button className="btn-badge">
              <FaTimes />
            </button>
            <div className="item-img">
              {!imageDepoiment ? (
                <div className="card-image-icon">
                  <FaImages
                    style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                  />
                </div>
              ) : (
                <img
                  className="img-item-used"
                  alt="Imagem"
                  src={previewImage}
                />
              )}
            </div>
            <div className="item-desc">
              <div className="logo-container-used">
                <img src={icone} alt="icone" className="icone-used" />
                <img src={logo} alt="logo" className="logo-used" />
              </div>
              <span className="used-description">{titleDepoimet}</span>
            </div>
          </div>

          <div className="used-item">
            <button className="btn-badge">
              <FaTimes />
            </button>
            <div className="item-img">
              {!imageDepoiment ? (
                <div className="card-image-icon">
                  <FaImages
                    style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                  />
                </div>
              ) : (
                <img
                  className="img-item-used"
                  alt="Imagem"
                  src={previewImage}
                />
              )}
            </div>
            <div className="item-desc">
              <div className="logo-container-used">
                <img src={icone} alt="icone" className="icone-used" />
                <img src={logo} alt="logo" className="logo-used" />
              </div>
              <span className="used-description">{titleDepoimet}</span>
            </div>
          </div>

          <div className="used-item">
            <button className="btn-badge">
              <FaTimes />
            </button>
            <div className="item-img">
              {!imageDepoiment ? (
                <div className="card-image-icon">
                  <FaImages
                    style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                  />
                </div>
              ) : (
                <img
                  className="img-item-used"
                  alt="Imagem"
                  src={previewImage}
                />
              )}
            </div>
            <div className="item-desc">
              <div className="logo-container-used">
                <img src={icone} alt="icone" className="icone-used" />
                <img src={logo} alt="logo" className="logo-used" />
              </div>
              <span className="used-description">{titleDepoimet}</span>
            </div>
          </div>

          <div className="used-item">
            <button className="btn-badge">
              <FaTimes />
            </button>
            <div className="item-img">
              {!imageDepoiment ? (
                <div className="card-image-icon">
                  <FaImages
                    style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                  />
                </div>
              ) : (
                <img
                  className="img-item-used"
                  alt="Imagem"
                  src={previewImage}
                />
              )}
            </div>
            <div className="item-desc">
              <div className="logo-container-used">
                <img src={icone} alt="icone" className="icone-used" />
                <img src={logo} alt="logo" className="logo-used" />
              </div>
              <span className="used-description">{titleDepoimet}</span>
            </div>
          </div>

          <div className="used-item">
            <button className="btn-badge">
              <FaTimes />
            </button>
            <div className="item-img">
              {!imageDepoiment ? (
                <div className="card-image-icon">
                  <FaImages
                    style={{ fontSize: 150, color: "rgb(237, 186, 0)" }}
                  />
                </div>
              ) : (
                <img
                  className="img-item-used"
                  alt="Imagem"
                  src={previewImage}
                />
              )}
            </div>
            <div className="item-desc">
              <div className="logo-container-used">
                <img src={icone} alt="icone" className="icone-used" />
                <img src={logo} alt="logo" className="logo-used" />
              </div>
              <span className="used-description">{titleDepoimet}</span>
            </div>
          </div>
        </div>

        <div className="title-page-two">
          <div className="header-left">
            <FaVideo style={{ marginRight: 20 }} />
            LISTAGEM DOS VÍDEOS
          </div>
        </div>

        <div className="video-content">
          <div className="video-container">
            <button className="btn-badge">
              <FaTimes />
            </button>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/xzx5-_4Vsx8"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

          <div className="video-container">
            <button className="btn-badge">
              <FaTimes />
            </button>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/xzx5-_4Vsx8"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

          <div className="video-container">
            <button className="btn-badge">
              <FaTimes />
            </button>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/xzx5-_4Vsx8"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

          <div className="video-container">
            <button className="btn-badge">
              <FaTimes />
            </button>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/xzx5-_4Vsx8"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

          <div className="video-container">
            <button className="btn-badge">
              <FaTimes />
            </button>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/xzx5-_4Vsx8"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
