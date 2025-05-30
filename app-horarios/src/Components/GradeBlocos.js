import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import "../styles/GradeBlocos.css"; 

function GradeBlocos({ blocos }) {
  return (
    <Droppable droppableId="blocos-list">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {blocos.map((bloco, index) => (
            <Draggable key={bloco.id} draggableId={bloco.id} index={index}>
              {(provided) => (
                <div
                  className="bloco-horario"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style,
                  }}
                >
                  <div className="cabecalho-disciplina">
                    <strong>{bloco.disciplina}</strong>
                    <div className="tipo-aula">({bloco.tipoAula})</div>
                  </div>
                  <div className="detalhes">
                    {bloco.professor}<br />
                    {bloco.sala}
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default GradeBlocos;
