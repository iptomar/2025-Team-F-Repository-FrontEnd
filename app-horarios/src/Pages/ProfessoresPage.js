import React from "react";
import PesquisaForm from "../Components/PesquisaForm";
import GradeHorario from "../Components/GradeHorario";



function ProfessoresPage() {
  return (
    <div className="container">
      <h2 className="mb-4 pt-3">Consulta e Planeamento de Horários</h2>

      {/* Formulário de pesquisa */}
      <PesquisaForm tipo="Horários" />

      {/* Grade horária (em breve) */}
       <GradeHorario blocos={[]} />
    </div>
  );
}

export default ProfessoresPage;

