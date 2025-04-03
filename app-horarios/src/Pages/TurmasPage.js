import React from "react";
import GradeHorario from "../Components/GradeHorario";



function TurmasPage() {
  return (
    <div className="container">
      <h2 className="mb-4">Consulta e Planeamento de Horários</h2>

     

      {/* Grade horária (em breve) */}
       <GradeHorario blocos={[]} />
    </div>
  );
}

export default TurmasPage;

