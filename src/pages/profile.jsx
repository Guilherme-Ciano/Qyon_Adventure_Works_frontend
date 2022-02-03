import React from "react";
import axios from "axios";

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import "../styles/profile.css";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
    color: "#ff0099",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Profile() {
  const [expanded, setExpanded] = React.useState(false);
  const [competidores, setCompetidores] = React.useState([]);
  const [pistas, setPistas] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  const getData = async () => {
    await axios
      .get("http://localhost:3001/get/all/historico_corridas/")
      .then((res) => {
        setRows(res.data.data);
      });
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function isAtivo(competidor) {
    competidor.Ativo = false;
    rows.forEach((row) => {
      if (row.CompetidorID === competidor.ID) {
        competidor.Ativo = true;
      }
    });
  }

  React.useEffect(() => {
    localStorage.removeItem("user");
    axios.get("http://localhost:3001/get/all/competidores").then((res) => {
      setCompetidores(res.data.data);
    });
    axios.get("http://localhost:3001/get/all/pistas").then((res) => {
      setPistas(res.data.data);
    });
    async function fetchData() {
      await getData();
    }

    fetchData();
  }, []);

  const preencherTabelas = async () => {
    const Competidores = [
      {
        Nome: "Caio Antunes",
        Sexo: "M",
        Peso: 89.9,
        Altura: 1.87,
        TemperaturaMediaCorpo: 35.5,
      },

      {
        Nome: "Marcos Ribeiro",
        Sexo: "O",
        Peso: 70.0,
        Altura: 1.55,
        TemperaturaMediaCorpo: 35.5,
      },

      {
        Nome: "Matt Andrews",
        Sexo: "M",
        Peso: 100.0,
        Altura: 1.9,
        TemperaturaMediaCorpo: 35.5,
      },

      {
        Nome: "Roberto Gomes",
        Sexo: "M",
        Peso: 30.0,
        Altura: 1.3,
        TemperaturaMediaCorpo: 35.5,
      },

      {
        Nome: "Gabriela Silva",
        Sexo: "F",
        Peso: 60.0,
        Altura: 1.66,
        TemperaturaMediaCorpo: 35.5,
      },
    ];

    const Pistas = [
      {
        Nome: "Pista 1",
        Descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      },

      {
        Nome: "Pista 2",
        Descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      },

      {
        Nome: "Pista 3",
        Descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      },

      {
        Nome: "Pista 4",
        Descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      },

      {
        Nome: "Pista 5",
        Descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      },
    ];

    const Historicos = [
      {
        CompetidorID: 0,
        PistaCorridaID: 1,
        DataCorrida: "12/12/2020",
        TempoGasto: 5.32,
      },

      {
        CompetidorID: 1,
        PistaCorridaID: 2,
        DataCorrida: "12/12/2020",
        TempoGasto: 15.34,
      },

      {
        CompetidorID: 0,
        PistaCorridaID: 3,
        DataCorrida: "10/12/2021",
        TempoGasto: 2.4,
      },

      {
        CompetidorID: 1,
        PistaCorridaID: 1,
        DataCorrida: "12/12/2020",
        TempoGasto: 5.3,
      },
    ];

    Competidores.map((competidor) => {
      axios.post("http://localhost:3001/post/corredor/create/", competidor);
      return "_";
    });

    Pistas.map((pista) => {
      axios.post("http://localhost:3001/post/pista/create/", pista);
      return "_";
    });

    Historicos.map((historico) => {
      axios.post(
        "http://localhost:3001/post/historico_corrida/create/",
        historico
      );
      return "_";
    });
  };

  if (competidores.length === 0) {
    return (
      <div className="background">
        <div className="profiles">
          <button className="buttonSubmit" onClick={preencherTabelas}>
            Preencher Tabelas
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="background">
        <div className="profiles">
          {competidores.map((competidor, i) => (
            <Accordion
              expanded={expanded === "panel" + i.toString()}
              onChange={handleChange("panel" + i.toString())}
              className="accordion"
            >
              {isAtivo(competidor)}
              <AccordionSummary
                aria-controls={"panel" + i.toString() + "d-content"}
                id={"panel" + i.toString() + "d-header"}
                className="accordion-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {competidor.Nome}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {competidor.Ativo ? (
                    <CheckCircleOutlineOutlinedIcon color="success" />
                  ) : (
                    <PriorityHighOutlinedIcon color="error" />
                  )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="row">
                    informações do competidor:
                    <button
                      onClick={async () => {
                        await axios
                          .delete(
                            "http://localhost:3001/delete/competidor/id=" +
                              competidor.ID
                          )
                          .then((res) => {
                            alert("Competidor deletado com sucesso!");
                            window.location.reload();
                          });
                      }}
                    >
                      Deletar competidor
                    </button>
                    <ArrowForwardIosSharpIcon
                      className="arrowUp"
                      onClick={() => {
                        setExpanded(false);
                      }}
                    />
                  </div>
                  <div className="grid_alter">
                    <div className="textLabel">Nome:</div>

                    <TextField
                      id="standard-basic"
                      label={competidor.Nome}
                      variant="standard"
                      onChange={(e) => (competidor.Nome = e.target.value)}
                    />
                    <div className="textLabel">Sexo:</div>

                    <TextField
                      id="standard-basic"
                      label={competidor.Sexo}
                      variant="standard"
                      onChange={(e) => (competidor.Sexo = e.target.value)}
                    />

                    <div className="textLabel">Altura:</div>
                    <TextField
                      id="standard-basic"
                      label={competidor.Altura}
                      variant="standard"
                      onChange={(e) => (competidor.Altura = e.target.value)}
                    />

                    <div className="textLabel">Peso:</div>
                    <TextField
                      id="standard-basic"
                      label={competidor.Peso}
                      variant="standard"
                      onChange={(e) => (competidor.Peso = e.target.value)}
                    />

                    <div className="textLabel">Temperatura Média:</div>
                    <TextField
                      id="standard-basic"
                      label={competidor.TemperaturaMediaCorpo}
                      variant="standard"
                      onChange={(e) =>
                        (competidor.TemperaturaMediaCorpo = e.target.value)
                      }
                    />

                    <button
                      onClick={() => {
                        // remove Ativo property of competidor
                        delete competidor.Ativo;
                        console.log(competidor);
                        axios
                          .patch(
                            "http://localhost:3001/patch/corredor/update/",
                            competidor
                          )
                          .then(() => {
                            alert("Atualizado com sucesso!");
                            window.location.reload();
                          });
                      }}
                    >
                      Salvar informações
                    </button>
                    <button
                      onClick={() => {
                        localStorage.setItem(
                          "user",
                          JSON.stringify(competidor)
                        );
                        window.location.href = "/profile/user";
                      }}
                    >
                      Observar resultado
                    </button>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>

        <div className="graphic">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Competidor</TableCell>
                  <TableCell align="left">Pista</TableCell>
                  <TableCell align="left">Data Corrida</TableCell>
                  <TableCell align="left">Tempo Gasto(min)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ID}
                    </TableCell>
                    <TableCell align="left">
                      {
                        competidores.find(
                          (competidor) => competidor.ID === row.CompetidorID
                        ).Nome
                      }
                    </TableCell>
                    <TableCell align="left">
                      {
                        pistas.find((pista) => pista.ID === row.PistaCorridaID)
                          .Nome
                      }
                    </TableCell>
                    <TableCell align="left">{row.DataCorrida}</TableCell>
                    <TableCell align="left">{row.TempoGasto}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}
