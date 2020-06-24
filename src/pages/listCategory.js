import React from "react";
import { Link } from "react-router-dom";
import { FaTags, FaHome } from "react-icons/fa";

export default function ListCategory() {
  return (
    <>
      <div className="header-component">
        <div className="header-left">
          <FaTags style={{ marginRight: 20, fontSize: 20 }} />
          LISTAGEM DE CATEGORIAS
        </div>
        <div>
          <Link to="/" className="link-to-home">
            <FaHome />
          </Link>
        </div>
      </div>
      <div className="content-page"></div>
    </>
  );
}
