import React from "react";
import axios from "axios";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import FormControl from "@mui/material/FormControl";
import MuiAccordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/material/styles";

import "../styles/cadastro_pista.css";

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

export default function CadPista() {
  const [expanded, setExpanded] = React.useState(false);
  const [pistas, setPistas] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  var pista = {
    Nome: "",
    Descricao: "",
  };

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3001/post/pista/create", pista)
      .then((response) => {
        if (response.data.status === 200) {
          alert("Pista cadastrada com sucesso!");
          window.location.href = "/";
        }
      })
      .catch((error) => {
        alert("Erro ao cadastrar pista!\n" + error);
      });
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  var labelNome = "";
  var labelDescricao = "";

  if (pista.Nome === "") {
    labelNome = "Nome";
  } else {
    labelNome = "";
  }

  if (pista.Descricao === "") {
    labelDescricao = "Descrição";
  } else {
    labelDescricao = "";
  }

  function isAtivo(pista) {
    pista.Ativo = false;
    rows.forEach((row) => {
      if (row.PistaCorridaID === pista.ID) {
        pista.Ativo = true;
      }
    });
  }

  React.useEffect(() => {
    axios.get("http://localhost:3001/get/all/pistas").then((res) => {
      setPistas(res.data.data);
    });
    axios
      .get("http://localhost:3001/get/all/historico_corridas/")
      .then((res) => {
        setRows(res.data.data);
      });
  }, []);

  return (
    <div className="section_pista">
      <div className="grid_container">
        <div className="form_pista">
          <FormControl className="formGroup_pista">
            <FormLabel component="legend">Cadastro de Pista</FormLabel>

            <TextField
              className="input"
              onChange={(event) => (pista.Nome = event.target.value)}
              label={labelNome}
              variant="outlined"
              type="text"
              required
            />
            <TextField
              className="input"
              onChange={(event) => (pista.Descricao = event.target.value)}
              label={labelDescricao}
              variant="outlined"
              type="text"
              multiline
              rows={4}
              required
            />

            <button className="buttonSubmit" onClick={handleSubmit}>
              Enviar
            </button>
          </FormControl>
        </div>

        <div className="pistas">
          {pistas.map((pista, i) => (
            <Accordion
              expanded={expanded === "panel" + i.toString()}
              onChange={handleChange("panel" + i.toString())}
              className="accordion"
            >
              {isAtivo(pista)}
              <AccordionSummary
                aria-controls={"panel" + i.toString() + "d-content"}
                id={"panel" + i.toString() + "d-header"}
                className="accordion-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {pista.Nome}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {pista.Ativo ? (
                    <Typography
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <CheckCircleOutlineOutlinedIcon color="success" />
                      Pista em uso
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <PriorityHighOutlinedIcon color="error" />
                      Pista fora de uso
                    </Typography>
                  )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="row">
                    informações da pista:
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
                      label={pista.Nome}
                      variant="standard"
                      onChange={(e) => (pista.Nome = e.target.value)}
                    />
                    <div className="textLabel">Descricao:</div>

                    <TextField
                      id="standard-basic"
                      label={pista.Descricao}
                      variant="standard"
                      onChange={(e) => (pista.Descricao = e.target.value)}
                    />

                    <button
                      onClick={async () => {
                        await axios
                          .delete(
                            "http://localhost:3001/delete/pista/id=" + pista.ID
                          )
                          .then((res) => {
                            alert("pista deletado com sucesso!");
                            window.location.reload();
                          });
                      }}
                    >
                      Deletar pista
                    </button>

                    <button
                      onClick={() => {
                        // remove Ativo property of pista
                        delete pista.Ativo;
                        console.log(pista);
                        axios
                          .patch(
                            "http://localhost:3001/patch/pista/update/",
                            pista
                          )
                          .then(() => {
                            alert("Atualizado com sucesso!");
                            window.location.reload();
                          });
                      }}
                    >
                      Salvar informações
                    </button>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}
