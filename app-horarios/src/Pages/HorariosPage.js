import React from "react";
import GradeHorario from "../Components/GradeHorario";
import GradeBlocos from "../Components/GradeBlocos";


function HorariosPage() {
  return (
    <>
      <div className="container">
        <div className="row">
          {/* Left container */}
          <div className="col-md-8">
            <h2 className="mb-4 pt-3">Consulta e Planeamento de Horários</h2>
            <div className="p-3 border"> {/* Add styling to make containers visible */}
              <GradeHorario blocos={[]} />
            </div>
          </div>

          {/* Right container */}
          <div className="col-md-4">
            <h2 className="mb-4 pt-3">Blocos</h2>
            <div className="p-3 border">
              {/* Add your content for the right container here */}
              <GradeBlocos />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HorariosPage;

