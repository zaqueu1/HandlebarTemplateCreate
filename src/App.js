import React from "react";
import { format, subDays } from "date-fns";
import { Container, Button } from "@material-ui/core";
import template from "./template.hbs";
import Handlebars from "handlebars";
import "./styles.css";

export default function App() {
  function getOptions() {
    let doctorCredType = "CRM";
    return {
      date: format(new Date(), "dd/MM/yyyy hh:mm"),
      specialty: "Cardiovascular",
      dateAttendance: format(subDays(new Date(), 15), "dd/MM/yyyy hh:mm"),
      opinionResumePatient:
        "Resumo do caso para o paciente do médico Specialista",
      OpinionProcedures: "Tem essas outras opinioes dos procedimentos",
      opinionMaterials: "Tem essas outras opinions dos Materiais",
      secondOpinionFinal: "Essas são minhas opiniões finais deste caso",
      protocolID: 401450124156410321454,
      operator: {
        name: "Operadora Fake Fake Fake",
        logo:
          "https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/11/medical-logo-design.jpeg"
      },
      doctorAssistant: {
        name: "Joao Menedito Assis",
        type:
          doctorCredType === "CRM"
            ? "Médico Assistente"
            : "Cirurgião-dentista Assistente",
        credentialType: doctorCredType,
        credentialNumber: "52582525"
      },
      doctorSpecialist: {
        name: "Claudio Medeiros Spec ",
        type:
          doctorCredType === "CRM"
            ? "Médico Especialista"
            : "Cirurgião-dentista Especialista",
        credentialType: doctorCredType,
        credentialNumber: "544314654",
        credentialState: "SC"
      },
      patient: {
        name: "Fernando Silva Benef",
        cpf: "01010120104"
      },
      procedures: Array(10)
        .fill()
        .map((t, v) => {
          return {
            procedure: { descricao_tuss: `procedimento ${Date.now()}${v}` },
            quantity: v + 10,
            doctor_justification: `Minha Justificação nº${v + 100}`,
            authorized_quantity: v + Math.round(Math.random() * 100),
            opinion:
              v % 2 === 0
                ? "Conclui pela cobertura do procedimento"
                : "Conclui pela Não cobertura do procedimento"
          };
        }),
      materials: Array(10)
        .fill()
        .map((t, v) => {
          return {
            name: `Material ${Date.now()}${v}`,
            quantity: v + 10,
            doctor_justification: `Minha Justificação nº${v + 100}`,
            authorized_quantity: v + Math.round(Math.random() * 100),
            opinion:
              v % 2 === 0
                ? "Conclui pela cobertura do procedimento"
                : "Conclui pela Não cobertura do procedimento"
          };
        })
    };
  }

  function handlerCompile() {
    const compilation = Handlebars.compile(template);
    let div = document.getElementById("tmpl");
    div.innerHTML = compilation(getOptions());
  }
  return (
    <div className="App">
      <Container>
        <h3>Gerar Template</h3>
        <Button variant="outlined" onClick={handlerCompile}>
          Gerar Template
        </Button>
        <br />
        <strong>template Abaixo</strong>
        <div id="tmpl"></div>
      </Container>
    </div>
  );
}
