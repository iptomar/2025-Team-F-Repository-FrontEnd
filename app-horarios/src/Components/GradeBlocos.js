import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Bloco individual com suporte a drag
function BlocoItem({ bloco }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: bloco.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "12px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f8f9fa",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <h4>{bloco.Cadeira}</h4>
      <p><strong>Horas:</strong> {bloco.Horas}</p>
      <p><strong>Professor:</strong> {bloco.Professor}</p>
      <p><strong>Turma:</strong> {bloco.Turma}</p>
      <p><strong>Curso:</strong> {bloco.Curso}</p>
    </div>
  );
}

function Blocos() {
  const [blocos, setBlocos] = useState([
    { id: "1", Cadeira: "IRL", Horas: 2, Professor: "João Silva", Turma: "A", Curso: "LEI" },
    { id: "2", Cadeira: "IOT", Horas: 3, Professor: "Maria Fernandes", Turma: "B", Curso: "LEI" },
    { id: "3", Cadeira: "SInf", Horas: 2, Professor: "Carlos Mendes", Turma: "C", Curso: "LEI" },
    { id: "4", Cadeira: "SInt", Horas: 4, Professor: "Ana Souza", Turma: "D", Curso: "LEI" },
    { id: "5", Cadeira: "RDII", Horas: 1, Professor: "Paulo Costa", Turma: "E", Curso: "LEI" },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = blocos.findIndex((item) => item.id === active.id);
      const newIndex = blocos.findIndex((item) => item.id === over?.id);
      setBlocos((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocos.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          {blocos.map((bloco) => (
            <BlocoItem key={bloco.id} bloco={bloco} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default Blocos;
