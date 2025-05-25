import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import BlocoHorario from "./BlocoHorario";

function GradeBlocos({ blocos }) {
  return (
    <Droppable droppableId="blocos-list">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {blocos.map((bloco, index) => (
            <Draggable key={bloco.id} draggableId={String(bloco.id)} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="mb-2"
                >
                  <BlocoHorario bloco={bloco} />
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
