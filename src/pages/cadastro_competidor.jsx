import React from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import "../styles/cadastro_comp.css";

export default function CadCompetidor() {
  var competidor = {
    nome: "",
    sexo: "",
    peso: "",
    altura: "",
    temperaturaMediaCorpo: "",
  };

  function parseObject() {
    var parsedCompetidor = {
      Nome: "",
      Sexo: "",
      Peso: 0.0,
      Altura: 0.0,
      TemperaturaMediaCorpo: 0.0,
    };

    if (
      competidor.peso === "" &&
      competidor.sexo === "" &&
      competidor.temperaturaMediaCorpo === "" &&
      competidor.altura === "" &&
      competidor.nome === ""
    ) {
      return false;
    }

    if (competidor.sexo === "female") {
      parsedCompetidor.Sexo = "F";
    }

    if (competidor.sexo === "male") {
      parsedCompetidor.Sexo = "M";
    }

    if (competidor.sexo === "other") {
      parsedCompetidor.Sexo = "O";
    }

    parsedCompetidor.Nome = competidor.nome;
    parsedCompetidor.Peso = parseFloat(
      parseFloat(competidor.peso).toPrecision(4)
    );
    parsedCompetidor.Altura = parseFloat(
      parseFloat(competidor.altura).toPrecision(3)
    );
    parsedCompetidor.TemperaturaMediaCorpo = parseFloat(
      parseFloat(competidor.temperaturaMediaCorpo).toPrecision(3)
    );

    return parsedCompetidor;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    var parsedCompetidor = parseObject();

    console.log(parsedCompetidor);

    if (parsedCompetidor === false) {
      alert("Preencha todos os campos");
    } else {
      const response = await axios.post(
        "http://localhost:3001/post/corredor/create/",
        parsedCompetidor
      );

      if (response.data.status === 200) {
        alert("Competidor cadastrado com sucesso!");
        window.location.href = "/profile/";
      } else {
        alert("Erro ao cadastrar competidor!");
      }
    }
  }

  var labelNome = "";
  var labelPeso = "";
  var labelAltura = "";
  var labelTemperaturaMediaCorpo = "";

  if (competidor.nome === "") {
    labelNome = "Nome";
  } else {
    labelNome = "";
  }

  if (competidor.peso === "") {
    labelPeso = "Peso";
  } else {
    labelPeso = "";
  }

  if (competidor.altura === "") {
    labelAltura = "Altura";
  } else {
    labelAltura = "";
  }

  if (competidor.temperaturaMediaCorpo === "") {
    labelTemperaturaMediaCorpo = "Temperatura Média do Corpo";
  } else {
    labelTemperaturaMediaCorpo = "";
  }

  return (
    <div className="section_comp">
      <div className="grid_inverted_container">
        <div className="left_img"></div>

        <div className="form">
          <FormControl className="formGroup">
            <FormLabel component="legend">Cadastro de Competidor</FormLabel>

            <TextField
              className="input"
              onChange={(event) => (competidor.nome = event.target.value)}
              label={labelNome}
              variant="outlined"
              type="text"
              required
            />
            <TextField
              className="input"
              onChange={(event) => (competidor.peso = event.target.value)}
              label={labelPeso}
              variant="outlined"
              type="number"
              step="0.01"
              required
            />
            <TextField
              className="input"
              onChange={(event) => (competidor.altura = event.target.value)}
              label={labelAltura}
              variant="outlined"
              type="number"
              required
            />

            <TextField
              className="input"
              onChange={(event) =>
                (competidor.temperaturaMediaCorpo = event.target.value)
              }
              label={labelTemperaturaMediaCorpo}
              variant="outlined"
              type="number"
              required
            />

            <FormLabel id="radio-buttons-group">Gênero</FormLabel>

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(event) => (competidor.sexo = event.target.value)}
              required
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Feminino"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Masculino"
              />

              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Outro"
              />
            </RadioGroup>

            <button className="buttonSubmit" onClick={handleSubmit}>
              Enviar
            </button>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
