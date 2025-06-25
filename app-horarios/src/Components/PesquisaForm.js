import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  fetchCursos,
  fetchEscolas,
  fetchTurmas
} from '../Services/api';

function PesquisaForm({ tipo, onPesquisar }) {
  const [escola, setEscola] = useState("");
  const [curso, setCurso] = useState("");
  const [ano, setAno] = useState("");
  const [semestre, setSemestre] = useState("");
  const [turma, setTurma] = useState("");

  const [escolas, setEscolas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [turmas, setTurmas] = useState([]);

  const isCursoEnabled = escola !== "";
  const isTurmaEnabled = curso !== "";
  const isAnoEnabled = curso !== "";
  const isSemestreEnabled = ano !== "";

  useEffect(() => {
    async function carregarDados() {
      try {
        const [escs, curs, turms] = await Promise.all([
          fetchEscolas(),
          fetchCursos(),
          fetchTurmas(),
        ]);
        setEscolas(escs);
        setCursos(curs);
        setTurmas(turms);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
    carregarDados();
  }, []);

  // Filtro de cursos da escola selecionada
  const cursosFiltrados = cursos.filter(c => {
    return escola ? c.idEscola === Number(escola) : false;
  });

  const cursoSelecionado = cursosFiltrados.find(c => c.id === Number(curso));
  const turmasFiltradas = cursoSelecionado?.turmas || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const cursoIdNum = Number(curso);
    const anoNum = Number(ano);
    const semestreNum = Number(semestre);

    if (curso && ano && semestre) {
      onPesquisar({
        cursoId: cursoIdNum,
        ano: anoNum,
        semestre: semestreNum,
      });
    } else {
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  const gerarOpcoesAno = () => {
    if (!cursoSelecionado) return null;

    let maxAnos = 1;
    switch (cursoSelecionado.tipo?.toLowerCase()) {
      case "licenciatura":
        maxAnos = 3;
        break;
      case "mestrado":
      case "tesp":
        maxAnos = 2;
        break;
      default:
        maxAnos = 1;
    }

    return Array.from({ length: maxAnos }, (_, i) => (
      <option key={i + 1} value={i + 1}>
        {i + 1}º Ano
      </option>
    ));
  };

  return (
    <div className="card p-4 shadow-sm border">
      <h5 className="mb-3">Filtrar {tipo}</h5>
      <form className="row g-3" onSubmit={handleSubmit}>

        {/* Escola (autocomplete) */}
        <div className="col-md-6">
          <label className="form-label">Escola</label>
          <Select
            options={escolas.map(e => ({
              value: e.id,
              label: e.nome
            }))}
            value={escolas.map(e => ({
              value: e.id,
              label: e.nome
            })).find(opt => opt.value === Number(escola))}
            onChange={(selected) => {
              setEscola(selected?.value || "");
              setCurso("");
              setAno("");
              setSemestre("");
              setTurma("");
            }}
            placeholder="Digite ou selecione a escola"
            noOptionsMessage={() => "Nenhuma escola encontrada"}
          />
        </div>

        {/* Curso (autocomplete) */}
        <div className="col-md-6">
          <label className="form-label">Curso</label>
          <Select
            options={cursosFiltrados.map(c => ({
              value: c.id,
              label: c.nome
            }))}
            value={cursosFiltrados
              .map(c => ({ value: c.id, label: c.nome }))
              .find(opt => opt.value === Number(curso))}
            onChange={(selected) => {
              setCurso(selected?.value || "");
              setAno("");
              setSemestre("");
              setTurma("");
            }}
            isDisabled={!isCursoEnabled}
            placeholder="Digite ou selecione o curso"
            noOptionsMessage={() => "Nenhum curso encontrado"}
          />
        </div>

        {/* Ano Académico */}
        <div className="col-md-4">
          <label className="form-label">Ano académico</label>
          <select
            className="form-select"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            disabled={!isAnoEnabled}
          >
            <option value="">Selecione</option>
            {gerarOpcoesAno()}
          </select>
        </div>

        {/* Semestre */}
        <div className="col-md-4">
          <label className="form-label">Semestre</label>
          <select
            className="form-select"
            value={semestre}
            onChange={(e) => setSemestre(e.target.value)}
            disabled={!isSemestreEnabled}
          >
            <option value="">Selecione</option>
            <option value="S1">1º Semestre</option>
            <option value="S2">2º Semestre</option>
          </select>
        </div>

        {/* Botão de pesquisa */}
        <div className="col-12 text-end mt-3">
          <button type="submit" className="btn btn-primary">
            Pesquisar
          </button>
        </div>
      </form>
      <div className="card p-4 shadow-sm border mt-4">
        <h5 className="mb-3">Turma e Ações</h5>

        <div className="row g-3 align-items-end">
          <div className="col-md-6">
            <label className="form-label">Turma</label>
            <select
              className="form-select"
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
              disabled={cursosFiltrados.length === 0}
            >
              <option value="">Selecione a turma</option>
              {turmasFiltradas.map(t => (
                <option key={t.id} value={t.id}>{t.nome}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6 d-flex gap-2">
            <button
              className="btn btn-success"
              disabled={!turma}
              onClick={() => {
                // Substitua pela lógica real
                console.log("✅ Salvar grade da turma:", turma);
              }}
            >
              <i className="bi bi-save" /> Salvar
            </button>

            <button
              className="btn btn-warning"
              disabled={!turma}
              onClick={() => {
                // Substitua pela lógica real
                console.log("🔒 Bloquear horário da turma:", turma);
              }}
            >
              <i className="bi bi-lock-fill" /> Bloquear
            </button>
          </div>
        </div>
      </div>

    </div>

  );
}

export default PesquisaForm;
