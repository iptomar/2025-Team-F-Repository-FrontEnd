  import React, { useEffect, useState } from "react";
  import { DragDropContext } from "@hello-pangea/dnd";
  import GradeHorario from "../Components/GradeHorario";
  import PesquisaForm from "../Components/PesquisaForm";
  import GradeBlocos from "../Components/GradeBlocos";
  import BotaoBloquear from "../Components/ButaoBloquear";
  import SeletorHorario from "../Components/TipoHorario";
  import BotaoGuardar from "../Components/BotaoGuardar";
  import { fetchBlocos } from '../Services/api';

  function TurmasPage() {
    const [gradeBlocos, setGradeBlocos] = useState([]);
    const [listaBlocos, setListaBlocos] = useState([]);

    const [isBlocked, setIsBlocked] = useState(false);


    const [semanaAtual, setSemanaAtual] = useState(1); // ALTERAÇÃO

    const handleDragEnd = (result) => {
      if (isBlocked) return; // Prevent drag if blocked

      const { source, destination, draggableId } = result;
      if (!destination) return;

      const isFromGrid = source.droppableId.startsWith("cell-");
      const isToGrid = destination.droppableId.startsWith("cell-");

      if (!isFromGrid && isToGrid) {
        const [_, dia, hora] = destination.droppableId.split("-");
        const bloco = listaBlocos.find((b) => b.id === draggableId);
        if (!bloco) return;

        setGradeBlocos((prev) => [...prev, { ...bloco, dia, hora }]);
        setListaBlocos((prev) => prev.filter((b) => b.id !== draggableId));
      } else if (isFromGrid && !isToGrid && destination.droppableId === "blocos-list") {
        const bloco = gradeBlocos.find((b) => b.id === draggableId);
        if (!bloco) return;

        setGradeBlocos((prev) => prev.filter((b) => b.id !== draggableId));
        setListaBlocos((prev) => [...prev, { ...bloco }]);
      }
    };

    const proximaSemana = () => setSemanaAtual((prev) => prev + 1); // ALTERAÇÃO
    const semanaAnterior = () =>
      setSemanaAtual((prev) => (prev > 1 ? prev - 1 : 1)); // impede ir abaixo da semana 1 // ALTERAÇÃO

    // Remover isso se o carregamento inicial não for obrigatório:
  useEffect(() => {
    async function carregarBlocos() {
      const cursoId = 1;
      const ano = 1;
      const semestre = 1;
      const blocosApi = await fetchBlocos(cursoId, ano, semestre);
      setListaBlocos(blocosApi);
    }

    carregarBlocos();
  }, []);



    return (
      <>
        <div className="container pt-3">
          <h2 className="mb-4 pt-3">Consulta e Planeamento de Horários</h2>
          <PesquisaForm
            tipo="Horários"
            onPesquisar={({ cursoId, ano, semestre }) => {
              fetchBlocos(cursoId, ano, semestre).then(setListaBlocos);
            }}
          />

        </div>
        
        <div className="container pt-3">
          <SeletorHorario/>
        </div>

        <div className="container">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="row">
              <div className="col-md-9">
                <div className="mb-4 pt-3 d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="mb-0">Horário Turma</h2>
                    <small className="text-muted">Semana {semanaAtual}</small>
                  </div>
                  <div className="d-flex">
                    <button className="btn btn-outline-secondary btn-sm me-2" onClick={semanaAnterior}>
                      ← Semana Anterior
                    </button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={proximaSemana}>
                      Próxima semana →
                    </button>
                  </div>
                </div>

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

              <BotaoGuardar isBlocked={isBlocked} />
              
              <BotaoBloquear isBlocked={isBlocked} setIsBlocked={setIsBlocked} />

            </div>
          </DragDropContext>
        </div>
      </>
    );
  }

  export default TurmasPage;
