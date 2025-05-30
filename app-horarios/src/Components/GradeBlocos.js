import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import BlocoHorario from "./BlocoHorario";

function GradeBlocos({ blocos }) {
  return (
    <Droppable droppableId="blocos-list">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {blocos.length === 0 ? (
            <div className="mensagem-vazia text-muted p-2">
              Não foi gerado nenhum bloco ou não existem correspondências.
            </div>
          ) : (
            blocos.map((bloco, index) => (
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
                      {bloco.professor}
                      <br />
                      {bloco.sala}
                    </div>
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
