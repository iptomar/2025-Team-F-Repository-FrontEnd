import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import GradeHorario from "../Components/GradeHorario";
import PesquisaForm from "../Components/PesquisaForm";
import GradeBlocos from "../Components/GradeBlocos";
import { fetchBlocos } from '../Services/api';
import { salvarHorario, salvarHorarioDTO, obterHorarioPorTurma, bloquearHorario } from '../Services/api';

function TurmasPage() {
  const [gradeBlocos, setGradeBlocos] = useState([]);
  const [listaBlocos, setListaBlocos] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [horarioBloqueado, setHorarioBloqueado] = useState(false);

  const calcularHoraFimComDuracao = (horaInicio, duracaoMinutos = 60) => {
    const [h, m] = horaInicio.split(":").map(Number);
    const totalMin = h * 60 + m + duracaoMinutos;
    const hh = String(Math.floor(totalMin / 60)).padStart(2, "0");
    const mm = String(totalMin % 60).padStart(2, "0");
    return `${hh}:${mm}`;
  };

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

      // 🚫 Verifica se já existe um bloco nessa posição
      const existe = gradeBlocos.some(
        (b) => b.dia === dia && b.horaInicio === hora
      );

      if (existe) {
        alert("Já existe um bloco nesta célula. Remova-o primeiro para adicionar outro.");
        return;
      }

      const bloco = listaBlocos.find((b) => String(b.id) === String(draggableId));
      if (!bloco) return;

      setGradeBlocos((prev) => [
        ...prev,
        {
          ...bloco,
          dia,
          horaInicio: hora,
          horaFim: calcularHoraFimComDuracao(hora, bloco.duracao || 1),
        },
      ]);

      setListaBlocos((prev) => prev.filter((b) => String(b.id) !== String(draggableId)));

    } else if (isFromGrid && !isToGrid && destination.droppableId === "blocos-list") {
      const bloco = gradeBlocos.find((b) => String(b.id) === String(draggableId));
      if (!bloco) return;

      setGradeBlocos((prev) => prev.filter((b) => String(b.id) !== String(draggableId)));
      setListaBlocos((prev) => [...prev, { ...bloco }]);
    }
  };


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

  const handleSalvar = async () => {
    if (!turmaSelecionada) {
      alert("Selecione uma turma para salvar o horário.");
      return;
    }


    if (!gradeBlocos.length) {
      alert("Nenhum bloco na grade para salvar.");
      return;
    }

    const dias = {
      "segunda": 1,
      "terca": 2,
      "terça": 2,
      "quarta": 3,
      "quinta": 4,
      "sexta": 5,
      "sabado": 6,
      "sábado": 6
    };

    const blocosParaSalvar = gradeBlocos.map((b) => {

      if (!podeSalvar()) {
        alert("❌ Sem permissão para salvar horários.");
        return;
      }
      const diaSemana = dias[b.dia?.toLowerCase()];
      if (!diaSemana) {
        console.warn("⚠️ Dia da semana inválido:", b.dia);
      }

      return {
        blocoAulaId: Number(b.idOriginal || b.id),
        diaSemana: diaSemana,
        horaInicio: b.horaInicio,
        horaFim: b.horaFim
      };
    });

    const dto = {
      turmaId: Number(turmaSelecionada),
      blocosHorarios: blocosParaSalvar
    };

    try {
      console.log("📦 Enviando DTO:", dto);
      await salvarHorarioDTO(dto);
      alert("✅ Horário salvo com sucesso!");
    } catch (error) {
      console.log("❌ Erro no envio:", error);
      alert("❌ Erro ao salvar horário. Verifique o console.");
    }
  };

  const handleBloquear = async () => {
    if (!podeBloquear()) {
      alert("❌ Apenas Admin pode bloquear horários.");
      return;
    }
    try {
      const blocos = await obterHorarioPorTurma(turmaSelecionada);
      if (!blocos.length) return alert("Nenhum horário encontrado para bloquear.");

      const horarioId = blocos[0].horarioId;
      await bloquearHorario(horarioId);
      setHorarioBloqueado(true);
      alert("✅ Horário bloqueado com sucesso!");
    } catch (error) {
      console.error("Erro ao bloquear horário:", error);
      alert("❌ Erro ao bloquear horário.");
    }
  };
  const loggedUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const tipoUser = loggedUser?.tipo;
  const cursosUser = loggedUser?.cursos || []; // caso queira associar mais tarde
  const escolasUser = loggedUser?.escolas || []; // caso associes escolas


  const podeSalvar = () => {
    return ["DiretorCurso", "Secretariado", "ComissaoCurso"].includes(tipoUser);
  };

  const podeBloquear = () => {
    return tipoUser === "DiretorCurso";
  };


const carregarGradeHorario = async (turmaId) => {
    try {
      const dados = await obterHorarioPorTurma(turmaId);

} catch (error) {
  console.error("Erro ao carregar grade da turma:", error);
}
};

useEffect(() => {
  if (turmaSelecionada) {
    carregarGradeHorario(turmaSelecionada);
  }
}, [turmaSelecionada]);

return (
  <>
    <div className="container pt-3">
      <h2 className="mb-4 pt-3">Planificação de Horários </h2>
      <PesquisaForm
        tipo="Horários"
        onPesquisar={({ cursoId, ano, semestre }) => {
          setGradeBlocos([]);            // Limpa a grade atual
          setListaBlocos([]);            // ✅ Limpa blocos laterais (importantíssimo)
          fetchBlocos(cursoId, ano, semestre)
            .then((blocos) => {
              if (Array.isArray(blocos)) {
                const blocosMapeados = blocos.map((b, index) => ({
                  id: `${b.id}-${Date.now()}-${index}`,
                  idOriginal: b.id, // 👈 preserva o ID real do BlocoAula
                  nomeDisciplina: b.nomeDisciplina,
                  tipoAula: b.tipoAula,
                  professor: Array.isArray(b.nomeProfessor)
                    ? b.nomeProfessor.join(", ")
                    : b.nomeProfessor,
                  sala: b.nomeSala,
                  duracao: b.duracao || 1
                }));

                setListaBlocos(blocosMapeados);
              } else {
                console.error("fetchBlocos não retornou array:", blocos);
              }
            })
            .catch((err) => console.error("Erro fetchBlocos:", err));
        }}
        onSalvar={handleSalvar}
        onBloquear={handleBloquear}
        setTurmaSelecionada={setTurmaSelecionada}
      />


    </div>

    <div className="container">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="row">
          <div className="col-md-9">
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
        </div>
      </DragDropContext>
    </div>
  </>
);
}

export default TurmasPage;
