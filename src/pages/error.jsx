import React from "react";

import "../styles/error.css";

export default function ErrorPage() {
  return (
    <div className="error">
      <div className="erro_img"></div>
      <div className="erro_text">
        <h1>A rota que você está acessando não existe</h1>
      </div>
    </div>
  );
}
