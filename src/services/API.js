import axios from "axios";

import Dialog from "./dialog";

import Competidor from "../models/competidor";
import Pista from "../models/pista";

export async function getAllCompetidores() {
  // {status, mensagem, data}
  const response = await axios.get(
    "http://localhost:3001/get/all/competidores/"
  );

  console.log(response);

  if (response.status !== 200) {
    return Dialog("error", "Erro", response.erro);
  } else {
    var competidores = [];
    response.data.data.forEach((element) => {
      competidores.push(
        new Competidor(
          element.Nome,
          element.Sexo,
          element.TemperaturaMediaCorpo,
          element.Peso,
          element.Altura,
          element.Id
        )
      );
    });
    return competidores;
  }
}

export async function getAllPistas() {
  // {status, mensagem, data}
  const response = await axios.get("http://localhost:3001/get/all/pistas/");

  if (response.status !== 200) {
    return Dialog("error", "Erro", response.erro);
  } else {
    var pistas = [];
    response.data.data.forEach((element) => {
      pistas.push(new Pista(element.Nome, element.Descricao));
    });
    return pistas;
  }
}

export async function getAllHistoricoCorridas() {
  // {status, mensagem, data}
  const response = await axios.get(
    "http://localhost:3001/get/all/historico/corridas/"
  );

  if (response.status !== 200) {
    return Dialog("error", "Erro", response.erro);
  } else {
    var corridas = [];
    response.data.data.forEach((element) => {
      corridas.push(element);
    });
    return corridas;
  }
}
