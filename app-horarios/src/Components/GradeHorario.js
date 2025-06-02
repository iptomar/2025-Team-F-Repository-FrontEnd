// GradeHorario.js
import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";

const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const horas = Array.from({ length: 28 }, (_, i) => {
  const h = String(Math.floor(i / 2) + 8).padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

function calcularDuracaoBlocos(horaInicio, horaFim) {
  if (
    !horaInicio || !horaFim ||
    !horaInicio.includes(":") || !horaFim.includes(":")
  ) return 1;

  const [h1, m1] = horaInicio.split(":").map(Number);
  const [h2, m2] = horaFim.split(":").map(Number);

  if (isNaN(h1) || isNaN(m1) || isNaN(h2) || isNaN(m2)) return 1;

  const minutos1 = h1 * 60 + m1;
  const minutos2 = h2 * 60 + m2;
  const duracaoMin = minutos2 - minutos1;
  const blocos30min = duracaoMin / 30;

  return Math.max(1, blocos30min);
}

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
          {horas.map((hora, rowIndex) => (
            <tr key={hora}>
              <td className="fw-bold">{hora}</td>
              {diasSemana.map((dia) => {
                const cellId = `cell-${dia}-${hora}`;

                // Verifica se há um bloco que deve começar exatamente nesta célula
                const bloco = blocos.find(
                  (b) => b.dia === dia && b.horaInicio === hora
                );

                // Evita renderizar células intermediárias já cobertas por um bloco com rowSpan
                const estaCelulaOcupada = blocos.some((b) => {
                  const iInicio = horas.indexOf(b.horaInicio);
                  const iFim = horas.indexOf(b.horaFim);
                  return (
                    b.dia === dia &&
                    iInicio !== -1 &&
                    iFim !== -1 &&
                    rowIndex > iInicio &&
                    rowIndex < iFim
                  );
                });

                if (estaCelulaOcupada) return null;

                const rowSpan = bloco
                  ? calcularDuracaoBlocos(bloco.horaInicio, bloco.horaFim)
                  : 1;

                return (
                  <td key={dia + hora} className="p-1" rowSpan={rowSpan}>
                    <Droppable droppableId={cellId}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          style={{ minHeight: "50px" }}
                        >
                          {bloco && (
                            <Draggable draggableId={`${bloco.id}`} index={0}>
                              {(provided) => (
                                <div
                                  className="bg-primary text-white p-1 rounded"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className="fw-bold">{bloco.nomeDisciplina}</div>
                                  <small>{bloco.professor}</small>
                                  <br />
                                  <small>{bloco.sala}</small>
                                </div>
                              )}
                            </Draggable>
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
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
