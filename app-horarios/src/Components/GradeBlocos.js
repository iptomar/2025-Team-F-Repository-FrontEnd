import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import BlocoHorario from "./BlocoHorario";

function GradeBlocos({ blocos }) {
  return (
    <Droppable droppableId="blocos-list">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="p-2 border rounded bg-light"
          style={{ minHeight: "100px" }}
        >
          {blocos.length === 0 ? (
            <div className="mensagem-vazia text-muted p-2">
              Não foi gerado nenhum bloco ou não existem correspondências.
            </div>
          ) : (
            blocos.map((bloco, index) => (
              <Draggable key={bloco.id} draggableId={bloco.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      marginBottom: "8px"
                    }}
                  >
                    <BlocoHorario bloco={bloco} />
                  </div>
                )}
              </Draggable>
            ))
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default GradeBlocos;
