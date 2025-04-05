import React from "react";
import PesquisaForm from "../Components/PesquisaForm";
import GradeHorario from "../Components/GradeHorario";
import GradeBlocos from "../Components/GradeBlocos";


function SalasPage() {
  return (
    <>
      <div className="container pt-3">
        <h2 className="mb-4 pt-3">Consulta e Planeamento de Horários</h2>

        <PesquisaForm tipo="Horários" />  

      </div>
      
      <div className="container">
        <div className="row">

          <div className="col-md-9">
            <h2 className="mb-4 pt-3">Horário Sala</h2>
            <div className="p-3 border">
              <GradeHorario blocos={[]} />
            </div>
          </div>

          <div className="col-md-3">
            <h2 className="mb-4 pt-3">Blocos</h2>
            <div className="p-3 border">
              <GradeBlocos />
            </div>
          </div>

          <div className="col-2 mt-3 pb-3">
            <button type="submit" className="btn btn-primary btn-lg">
              Exportar Excel  
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default SalasPage;

