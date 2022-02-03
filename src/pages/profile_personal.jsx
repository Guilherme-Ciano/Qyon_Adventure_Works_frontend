import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import _ from "lodash";
import axios from "axios";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import men from "../assets/men.png";
import girl from "../assets/girl.png";
import "../styles/profile_personal.css";

export const options = {
  width: "100%",
  height: "100%",
  title: "Tempo gasto em cada pista",
  hAxis: {
    title: "Pistas(id)",
    minValue: 0,
    position: "bottom",
  },
  vAxis: {
    title: "Tempo",
  },
  legend: { position: "bottom", maxLines: 1 },
};

export default function PersonalProfile() {
  const [chartData, setChartData] = React.useState([]);
  const [pista, setpista] = React.useState(1);
  const [pistas, setPistas] = React.useState([]);
  const [tempo, settempo] = React.useState(0.0);
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));

  const user = JSON.parse(localStorage.getItem("user"));

  var CorridaFeita = {
    CompetidorID: user.ID,
    PistaCorridaID: pista,
    DataCorrida: date,
    TempoGasto: parseFloat(tempo),
  };

  function handleSubmit() {
    console.log("Submit", CorridaFeita);
    axios
      .post(
        "http://localhost:3001/post/historico_corrida/create/",
        CorridaFeita
      )
      .then(function (response) {
        alert("Corrida registrada com sucesso!");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    async function fetchData() {
      var dataSet = [];
      await axios
        .get(
          "http://localhost:3001/get/historico_corridas/id=" +
            user.ID.toString()
        )
        .then((res) => {
          dataSet = res.data.data;
        });

      const values = _.groupBy(dataSet, (value) => value.PistaCorridaID);

      const result = _.map(values, (value, key) => {
        return [key, value[0].TempoGasto];
      });

      setChartData([["Pista(id)", "Tempo(min)"], ...result]);
    }

    axios.get("http://localhost:3001/get/all/pistas").then((res) => {
      setPistas(res.data.data);
    });
    fetchData();
  }, []);

  var isEmpty = () => {
    if (chartData.length < 2) {
      return true;
    } else {
      return false;
    }
  };

  const getImage = () => {
    if (user.Sexo === "M") {
      return men;
    } else {
      return girl;
    }
  };

  return (
    <div className="Profile_container">
      <div className="grid_profile">
        <div className="profile_picture_area">
          <img
            src={getImage()}
            alt="profile_picture"
            className="profile_picture"
          />
          <div className="grid_2">
            <h4>{user.Nome}</h4>
            <h4>{"Sexo:" + user.Sexo}</h4>
            <h4>{user.Peso + "Kg"}</h4>
            <h4>{user.Altura + "m"}</h4>
          </div>
        </div>
        <div className="profile_dashboard_area">
          <div className="graph">
            {isEmpty() ? (
              <h1 className="black">Nenhuma corrida feita</h1>
            ) : (
              <Chart chartType="AreaChart" data={chartData} options={options} />
            )}
          </div>
          <div className="startRace">
            <FormControl className="formGroup">
              <FormLabel component="legend">Cadastrar Corrida</FormLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pista}
                label="Pista"
                helperText="Selecione a Pista de Corrida"
                autoWidth
                onChange={(event) => {
                  CorridaFeita.PistaCorridaID = event.target.value;
                  setpista(event.target.value);
                }}
              >
                {pistas.map((pista) => (
                  <MenuItem value={pista.ID}>{pista.Nome}</MenuItem>
                ))}
              </Select>

              <TextField
                label="Data da Corrida"
                inputFormat="yyyy-MM-dd"
                defaultValue={new Date().toLocaleDateString()}
                onChange={(event) => setDate(event.target.value)}
                renderInput={(params) => <TextField {...params} />}
              />

              <TextField
                label="Tempo gasto em minutos"
                defaultValue="00.00"
                onChange={(event) => settempo(parseFloat(event.target.value))}
                renderInput={(params) => <TextField {...params} />}
              />

              <button className="buttonSubmit" onClick={handleSubmit}>
                Cadastrar
              </button>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}

// if (Localstorage === null) {
// return (
//     <div className="error">
//       <div className="erro_img"></div>
//       <div className="erro_text">
//         <h1>
//           Você não está logado: <Link to="/profile">Voltar</Link>
//         </h1>
//       </div>
//     </div>
//   );
// } else {

// }
