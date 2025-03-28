import React from "react";

function PesquisaForm({ tipo }) {
  return (
    <div className="card p-4 shadow-sm border">
      <h5 className="mb-3">Filtrar {tipo}</h5>
      <form className="row g-3">

        <div className="col-md-4">
          <label className="form-label">Escola</label>
          <select className="form-select">
            <option>Selecione</option>
            <option>Tomar</option>
            <option>Abrantes</option>
            <option>Loures</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Curso</label>
          <select className="form-select">
            <option>Selecione</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Ano académico</label>
          <select className="form-select">
            <option>1º Ano</option>
            <option>2º Ano</option>
            <option>3º Ano</option>
          </select>
        </div>

        {/* Campos específicos por tipo de página */}
        {tipo === "Horários" && (
          <>
            <div className="col-md-6">
              <label className="form-label">Turma</label>
              <select className="form-select">
                <option>Selecione</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Sala</label>
              <select className="form-select">
                <option>Selecione</option>
              </select>
            </div>
          </>
        )}

        <div className="col-12 text-end mt-3">
          <button type="submit" className="btn btn-primary">
            Pesquisar
          </button>
        </div>
      </form>
    </div>
  );
}

export default PesquisaForm;
