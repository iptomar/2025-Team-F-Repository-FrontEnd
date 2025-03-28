import React from "react";

const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const horas = Array.from({ length: 28 }, (_, i) => {
  const h = String(Math.floor(i / 2) + 8).padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

function GradeHorario({ blocos = [] }) {
  return (
    <div className="table-responsive mt-4">
      <table className="table table-bordered text-center align-middle table-sm">
        <thead className="table-light">
          <tr>
            <th>Hora</th>
            {diasSemana.map((dia) => (
              <th key={dia}>{dia}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horas.map((hora) => (
            <tr key={hora}>
              <td className="fw-bold">{hora}</td>
              {diasSemana.map((dia) => {
                const bloco = blocos.find(
                  (b) => b.dia === dia && b.hora === hora
                );
                return (
                  <td key={dia + hora}>
                    {bloco ? (
                      <div className="bg-primary text-white p-1 rounded">
                        <div className="fw-bold">{bloco.disciplina}</div>
                        <small>{bloco.professor}</small>
                        <br />
                        <small>{bloco.sala}</small>
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GradeHorario;
