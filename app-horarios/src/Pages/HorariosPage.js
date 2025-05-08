import React from "react";
import GradeHorario from "../Components/GradeHorario";


function HorariosPage() {
  return (
    <>
      <div className="container">
        <div className="row">
          
          <div className="col-md-12">
            <h2 className="mb-4 pt-3">Consulta e Planeamento de Horários</h2>
            <div className="p-3 border"> {/* Add styling to make containers visible */}
              <GradeHorario blocos={[]} />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default HorariosPage;

