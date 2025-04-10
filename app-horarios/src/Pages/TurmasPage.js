// TurmasPage.js
import React, { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import GradeHorario from "../Components/GradeHorario";
import PesquisaForm from "../Components/PesquisaForm";
import GradeBlocos from "../Components/GradeBlocos";

function TurmasPage() {
  const [gradeBlocos, setGradeBlocos] = useState([]);
  const [listaBlocos, setListaBlocos] = useState([
    { id: "1", disciplina: "IRL", professor: "João Silva", sala: "A1", horas: 2 },
    { id: "2", disciplina: "IOT", professor: "Maria Fernandes", sala: "B2", horas: 3 },
    { id: "3", disciplina: "SInf", professor: "Carlos Mendes", sala: "C1", horas: 2 },
  ]);

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    // If dropping into a GradeHorario cell
    if (destination.droppableId.startsWith("cell-")) {
      const [_, dia, hora] = destination.droppableId.split("-");

      const bloco = listaBlocos.find((b) => b.id === draggableId);
      if (!bloco) return;

      // Add to grid, remove from blocos list
      setGradeBlocos((prev) => [...prev, { ...bloco, dia, hora }]);
      setListaBlocos((prev) => prev.filter((b) => b.id !== draggableId));
    }
  };

  return (
    <>
      <div className="container pt-3">
        <h2 className="mb-4 pt-3">Consulta e Planeamento de Horários</h2>
        <PesquisaForm tipo="Horários" />
      </div>

      <div className="container">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="row">
            <div className="col-md-9">
              <h2 className="mb-4 pt-3">Horário Turma</h2>
              <div className="p-3 border">
                <GradeHorario blocos={gradeBlocos} />
              </div>
            </div>

            <div className="col-md-3">
              <h2 className="mb-4 pt-3">Blocos</h2>
              <div className="p-3 border">
                <GradeBlocos blocos={listaBlocos} />
              </div>
            </div>

            <div className="col-2 mt-3 pb-3">
              <button type="submit" className="btn btn-primary btn-lg">
                Exportar Excel
              </button>
            </div>
          </div>
        </DragDropContext>
      </div>
    </>
  );
}

export default TurmasPage;
