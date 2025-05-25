import React from "react";

function BlocoHorario({ bloco }) {
  return (
    <div className="p-2 border rounded text-center shadow-sm bg-white mb-2">
      <div className="fw-bold border-bottom">{bloco.nomeDisciplina}</div>
      <div className="text-muted fst-italic">({bloco.tipoAula})</div>
      <div className="mt-1">{bloco.professor}</div>
      <div className="fw-semibold">{bloco.sala}</div>
    </div>
  );
}

export default BlocoHorario;
