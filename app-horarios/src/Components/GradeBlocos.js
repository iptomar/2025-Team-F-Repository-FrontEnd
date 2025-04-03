import React from "react";

function Blocos() {
  // Array of block descriptions
  const blocos = [
    {
      Cadeira: "IRL",
      Horas: 2,
      Professor: "João Silva",
      Turma: "A",
      Curso: "LEI"
    },
    {
      Cadeira: "IOT",
      Horas: 3,
      Professor: "Maria Fernandes",
      Turma: "B",
      Curso: "LEI"
    },
    {
      Cadeira: "SInf",
      Horas: 2,
      Professor: "Carlos Mendes",
      Turma: "C",
      Curso: "LEI"
    },
    {
      Cadeira: "SInt",
      Horas: 4,
      Professor: "Ana Souza",
      Turma: "D",
      Curso: "LEI"
    },
    {
      Cadeira: "RDII",
      Horas: 1,
      Professor: "Paulo Costa",
      Turma: "E",
      Curso: "LEI"
    },
  ];

  return (
    <div>
      {blocos.map((bloco, index) => (
        <div key={index} className="p-3 mb-3 border rounded bg-light">
          <h5 className="mb-1">{bloco.Cadeira}</h5>
          <p className="mb-1"><strong>Horas:</strong> {bloco.Horas}</p>
          <p className="mb-1"><strong>Professor:</strong> {bloco.Professor}</p>
          <p className="mb-0"><strong>Turma:</strong> {bloco.Turma}</p>
          <p className="mb-0"><strong>Curso:</strong> {bloco.Curso}</p>
        </div>
      ))}
    </div>
  );
}

export default Blocos;
