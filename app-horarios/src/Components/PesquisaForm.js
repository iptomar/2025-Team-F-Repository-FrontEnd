import React, { useState } from "react";

function PesquisaForm({ tipo }) {
  const [escola, setEscola] = useState("");
  const [curso, setCurso] = useState("");
  const [ano, setAno] = useState("");
  const [semestre, setSemestre] = useState("");

  const isCursoEnabled = escola !== "";
  const isAnoEnabled = escola !== "";
  const isSemestreEnabled = curso !== "" && ano !== "";
  const isTurmaSalaEnabled = semestre !== "";

  return (
    <div className="card p-4 shadow-sm border">
      <h5 className="mb-3">Filtrar {tipo}</h5>
      <form className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Escola</label>
          <select
            className="form-select"
            value={escola}
            onChange={(e) => setEscola(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="Tomar">Tomar</option>
            <option value="Abrantes">Abrantes</option>
            <option value="Loures">Loures</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Curso</label>
          <select
            className="form-select"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            disabled={!isCursoEnabled}
          >
            <option value="">Selecione</option>
            {/* Add real options here */}
            <option value="LEI">LEI</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Ano académico</label>
          <select
            className="form-select"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            disabled={!isAnoEnabled}
          >
            <option value="">Selecione</option>
            <option value="1">1º Ano</option>
            <option value="2">2º Ano</option>
            <option value="3">3º Ano</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Semestre</label>
          <select
            className="form-select"
            value={semestre}
            onChange={(e) => setSemestre(e.target.value)}
            disabled={!isSemestreEnabled}
          >
            <option value="">Selecione</option>
            <option value="1">1º Semestre</option>
            <option value="2">2º Semestre</option>
          </select>
        </div>

        {tipo === "Horários" && (
          <>
            <div className="col-md-6">
              <label className="form-label">Turma</label>
              <select className="form-select" disabled={!isTurmaSalaEnabled}>
                <option value="">Selecione</option>
                {/* More options here */}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Sala</label>
              <select className="form-select" disabled={!isTurmaSalaEnabled}>
                <option value="">Selecione</option>
                {/* More options here */}
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
