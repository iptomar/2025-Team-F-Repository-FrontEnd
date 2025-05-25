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
  if (!horaInicio || !horaFim) return 1;
  const [h1, m1] = horaInicio.split(":").map(Number);
  const [h2, m2] = horaFim.split(":").map(Number);
  const minutos1 = h1 * 60 + m1;
  const minutos2 = h2 * 60 + m2;
  const duracaoMin = minutos2 - minutos1;
  return Math.max(1, duracaoMin / 30);
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
                const bloco = blocos.find((b) => b.dia === dia && b.horaInicio === hora);
                const cellId = `cell-${dia}-${hora}`;

                const jaRenderizado = blocos.some((b) => {
                  const blocosAntes = horas.slice(0, rowIndex);
                  const blocosOcupados = calcularDuracaoBlocos(b.horaInicio, b.horaFim);
                  return (
                    b.dia === dia &&
                    blocosAntes.includes(hora) &&
                    horas.indexOf(b.horaInicio) + blocosOcupados > rowIndex
                  );
                });

                if (jaRenderizado) return null;

                return (
                  <td
                    key={dia + hora}
                    className="p-1"
                    rowSpan={bloco ? calcularDuracaoBlocos(bloco.horaInicio, bloco.horaFim) : 1}
                  >
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
