import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Competidor from "../models/competidor";

import "../styles/home.css";

export default function Home() {
  const navigateTo = useNavigate();

  return (
    <>
      <div className="section">
        <div className="grid_container">
          <div className="left">
            <div className="textArea">
              <h1>Runstatic</h1>
              <h3>
                Veja seu tempo diminuir a cada volta, sua determinação
                aumentando a cada corrida, e esteja sempre à um passo da
                vitória!
              </h3>
            </div>

            <div className="buttonsArea">
              <button
                className="button"
                onClick={() => {
                  navigateTo("/cadastro_competidor");
                }}
              >
                <a>Cadastrar Competidor</a>
              </button>
              <button
                className="button"
                onClick={() => {
                  navigateTo("/cadastro_pista");
                }}
              >
                <a>Cadastrar Pista</a>
              </button>
            </div>
          </div>

          <div className="right"></div>
        </div>
      </div>
    </>
  );
}
