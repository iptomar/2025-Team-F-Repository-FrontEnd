import React, { useEffect, useState } from 'react';
import {
  fetchCursos,
  fetchEscolas,
  fetchLocalizacoes,
  // fetchTurmas, fetchSalas (se for usar depois)
} from '../Services/api';

function PesquisaForm({ tipo, onPesquisar }) {
  const [localizacao, setLocalizacao] = useState("");
  const [escola, setEscola] = useState("");
  const [curso, setCurso] = useState("");
  const [ano, setAno] = useState("");
  const [semestre, setSemestre] = useState("");
  const [turma, setTurma] = useState("");

  const [localizacoes, setLocalizacoes] = useState([]);
  const [escolas, setEscolas] = useState([]);
  const [cursos, setCursos] = useState([]);

  const isEscolaEnabled = localizacao !== "";
  const isCursoEnabled = escola !== "";
  const isTurmaEnabled = curso !== "";
  const isAnoEnabled = curso !== "";
  const isSemestreEnabled = ano !== "";

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [locs, escs, curs] = await Promise.all([
          fetchLocalizacoes(),
          fetchEscolas(),
          fetchCursos()
        ]);
        setLocalizacoes(locs);
        setEscolas(escs);
        setCursos(curs);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    carregarDados();
  }, []);

  const escolasFiltradas = localizacao
    ? escolas.filter(e => e.localizacao && e.localizacao.id === parseInt(localizacao))
    : escolas;

  const escolaSelecionada = escolas.find(e => e.id === parseInt(escola));
  const cursosFiltrados = escolaSelecionada?.cursos || [];

  const cursoSelecionado = cursosFiltrados.find(c => c.id === parseInt(curso));
  const turmasFiltradas = cursoSelecionado?.turmas || [];



  const handleSubmit = (e) => {
    e.preventDefault();
    if (curso && ano && semestre) {
      onPesquisar({
        cursoId: parseInt(curso),
        ano: parseInt(ano),
        semestre: parseInt(semestre)
      });
    } else {
      console.warn("Campos obrigatórios em falta!");
    }
  };
  

  return (
    <div className="card p-4 shadow-sm border">
      <h5 className="mb-3">Filtrar {tipo}</h5>
      <form className="row g-3" onSubmit={handleSubmit}>
        {/* Localização */}
        <div className="col-md-4">
          <label className="form-label">Localização</label>
          <select
            className="form-select"
            value={localizacao}
            onChange={(e) => {
              setLocalizacao(e.target.value);
              setEscola("");
              setCurso("");
            }}
          >
            <option value="">Selecione</option>
            {localizacoes.map((l) => (
              <option key={l.id} value={l.id}>{l.nome}</option>
            ))}
          </select>
        </div>

        {/* Escola */}
        <div className="col-md-4">
          <label className="form-label">Escola</label>
          <select
            className="form-select"
            value={escola}
            onChange={(e) => {
              setEscola(e.target.value);
              setCurso("");
            }}
            disabled={!isEscolaEnabled}
          >
            <option value="">Selecione</option>
            {escolasFiltradas.map((e) => (
              <option key={e.id} value={e.id}>{e.nome}</option>
            ))}
          </select>
        </div>

        {/* Curso */}
        <div className="col-md-4">
          <label className="form-label">Curso</label>
          <select
            className="form-select"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            disabled={!isCursoEnabled}
          >
            <option value="">Selecione</option>
            {cursosFiltrados.map((c) => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>

        {/* Turma */}
        <div className="col-md-4">
          <label className="form-label">Turma</label>
          <select
            className="form-select"
            value={turma}
            onChange={(e) => setTurma(e.target.value)}
            disabled={!isTurmaEnabled}
          >
            <option value="">Selecione</option>
            {turmasFiltradas.map((t) => (
              <option key={t.id} value={t.id}>{t.nome}</option>
            ))}
          </select>
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
            {(() => {
              const cursoSelecionado = cursos.find(c => c.id === parseInt(curso));
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
                <option key={i + 1} value={i + 1}>{i + 1}º Ano</option>
              ));
            })()}
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
            <option value="1">1º Semestre</option>
            <option value="2">2º Semestre</option>
          </select>
        </div>

        {/* Botão de pesquisa */}
        <div className="col-12 text-end mt-3">
          <button type="submit" className="btn btn-primary">
            Pesquisar
          </button>
        </div>
      </form>
    </div>
  );
}

export default PesquisaForm;
