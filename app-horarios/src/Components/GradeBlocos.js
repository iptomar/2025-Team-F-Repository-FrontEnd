// GradeBlocos.js
import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";

function GradeBlocos({ blocos }) {
  return (
    <Droppable droppableId="blocos-list">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {blocos.map((bloco, index) => (
            <Draggable key={bloco.id} draggableId={bloco.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style,
                    padding: "12px",
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    backgroundColor: "#f8f9fa",
                    cursor: "grab",
                  }}
                >
                  <h4>{bloco.disciplina}</h4>
                  <p><strong>Professor:</strong> {bloco.professor}</p>
                  <p><strong>Sala:</strong> {bloco.sala}</p>
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
