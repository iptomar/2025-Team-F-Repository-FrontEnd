import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const horas = Array.from({ length: 28 }, (_, i) => {
  const h = String(Math.floor(i / 2) + 8).padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

function GradeHorario({ blocos = [] }) {
  const [itens, setItens] = React.useState(blocos);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(itens);
    const [removido] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removido);
    setItens(reordered);
  };

  return (
    <div className="table-responsive mt-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="grade">
          {(provided) => (
            <table
              className="table table-bordered text-center align-middle table-sm"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
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
                      const bloco = itens.find(
                        (b) => b.dia === dia && b.hora === hora
                      );
                      return (
                        <td key={dia + hora} className="p-1">
                          {bloco ? (
                            <Draggable
                              draggableId={`${bloco.dia}-${bloco.hora}`}
                              index={itens.indexOf(bloco)}
                            >
                              {(provided) => (
                                <div
                                  className="bg-primary text-white p-1 rounded"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className="fw-bold">{bloco.disciplina}</div>
                                  <small>{bloco.professor}</small>
                                  <br />
                                  <small>{bloco.sala}</small>
                                </div>
                              )}
                            </Draggable>
                          ) : (
                            <span></span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default GradeHorario;
