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
  const [semanaAtual, setSemanaAtual] = useState(1);

  const handleDragEnd = (result) => {
    if (isBlocked) return;

    const { source, destination, draggableId } = result;
    if (!destination) return;

    const isFromGrid = source.droppableId.startsWith("cell-");
    const isToGrid = destination.droppableId.startsWith("cell-");

    if (!isFromGrid && isToGrid) {
      const parts = destination.droppableId.split("-");
      if (parts.length < 3) return;

      const dia = parts[1];
      const hora = parts.slice(2).join("-");
      const bloco = listaBlocos.find((b) => String(b.id) === String(draggableId));
      if (!bloco) return;

<<<<<<< HEAD
      setGradeBlocos((prev) => [
        ...prev,
        {
          ...bloco,
          dia,
          horaInicio: hora,
          horaFim: calcularHoraFimComDuracao(hora),
        },
      ]);

      setListaBlocos((prev) => prev.filter((b) => String(b.id) !== String(draggableId)));
=======
      setGradeBlocos((prev) => [...prev, { ...bloco, dia, hora }]);
      setListaBlocos((prev) => prev.filter((b) => b.id !== draggableId));
>>>>>>> f88913940169e317746ded1a7340368303caa360
    } else if (isFromGrid && !isToGrid && destination.droppableId === "blocos-list") {
      const bloco = gradeBlocos.find((b) => b.id === draggableId);
      if (!bloco) return;

      setGradeBlocos((prev) => prev.filter((b) => String(b.id) !== String(draggableId)));
      setListaBlocos((prev) => [...prev, { ...bloco }]);
    }
  };

  const proximaSemana = () => setSemanaAtual((prev) => prev + 1);
  const semanaAnterior = () => setSemanaAtual((prev) => (prev > 1 ? prev - 1 : 1));

<<<<<<< HEAD
  const calcularHoraFimComDuracao = (horaInicio, duracaoHoras) => {
    const [h, m] = horaInicio.split(":").map(Number);
    const totalMin = h * 60 + m + duracaoHoras * 60;
    const hh = String(Math.floor(totalMin / 60)).padStart(2, "0");
    const mm = String(totalMin % 60).padStart(2, "0");
    return `${hh}:${mm}`;
  };


=======
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

  useEffect(() => {
    localStorage.setItem("gradeBlocosTemp", JSON.stringify(gradeBlocos));
  }, [gradeBlocos]);
>>>>>>> f88913940169e317746ded1a7340368303caa360

  return (
    <>
      <div className="container pt-3">
        <h2 className="mb-4 pt-3">Consulta e Planeamento de Horários</h2>
        <PesquisaForm
          tipo="Horários"
          onPesquisar={({ cursoId, ano, semestre }) => {
            setGradeBlocos([]);
            fetchBlocos(cursoId, ano, semestre)
              .then((blocos) => {
                if (Array.isArray(blocos)) {
                  const blocosMapeados = blocos.map((b, index) => ({
<<<<<<< HEAD
                    id: `${b.idBloco}-${Date.now()}`,
=======
                    id: index,
>>>>>>> f88913940169e317746ded1a7340368303caa360
                    nomeDisciplina: b.nomeDisciplina,
                    tipoAula: b.tipoAula,
                    professor: Array.isArray(b.nomeProfessor) ? b.nomeProfessor.join(", ") : b.nomeProfessor,
                    sala: b.nomeSala,
<<<<<<< HEAD
                    duracao: b.duracao || 1 // ← garante que a duração está presente!
=======
>>>>>>> f88913940169e317746ded1a7340368303caa360
                  }));

                  setListaBlocos(blocosMapeados);
                } else {
                  console.error("fetchBlocos não retornou array:", blocos);
                }
              })
              .catch((err) => console.error("Erro fetchBlocos:", err));
          }}
        />
      </div>

      <div className="container pt-3">
        <SeletorHorario />
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
