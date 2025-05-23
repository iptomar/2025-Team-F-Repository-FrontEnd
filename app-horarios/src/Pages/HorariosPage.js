import React from "react";
import Navbar from "../Components/Navbar";

function HorariosPage() {
  return (
    <>
      <div className="container">
        <div className="row">
          
          <div className="col-md-12">
            <h3 className="mb-4 pt-3">Turmas</h3>
            <div className="p-3 border">

            </div>
            <div className="col-2 mt-3 pb-3">
              <button type="submit" className="btn btn-primary btn-lg">
                Exportar PDF
              </button>
            </div>
            <h3 className="mb-4 pt-3">Docentes</h3>
            <div className="p-3 border">

            </div>
            <div className="col-2 mt-3 pb-3">
              <button type="submit" className="btn btn-primary btn-lg">
                Exportar PDF
              </button>
            </div>
            <h3 className="mb-4 pt-3">Salas</h3>
            <div className="p-3 border">

            </div>
            <div className="col-2 mt-3 pb-3">
              <button type="submit" className="btn btn-primary btn-lg">
                Exportar PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HorariosPage;

