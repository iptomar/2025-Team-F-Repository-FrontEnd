import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  fetchCursos,
  fetchEscolas,
  fetchTurmas,
  fetchTurmasPorCurso,
  salvarHorario
} from '../Services/api';


function PesquisaForm({ tipo, onPesquisar, onSalvar, setTurmaSelecionada, onBloquear }) {


  const [escola, setEscola] = useState("");
  const [curso, setCurso] = useState("");
  const [ano, setAno] = useState("");
  const [semestre, setSemestre] = useState("");
  const [turma, setTurma] = useState(null);


  const [escolas, setEscolas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [turmas, setTurmas] = useState([]);

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

  useEffect(() => {
    if (curso) {
      fetchTurmasPorCurso(curso)
        .then(setTurmas)
        .catch((err) => {
          console.error("Erro ao buscar turmas:", err);
          setTurmas([]);
        });
    } else {
      setTurmas([]);
    }
  }, [curso]);

  const cursosFiltrados = cursos.filter(c => escola && c.idEscola === Number(escola));
  const cursoSelecionado = cursosFiltrados.find(c => c.id === Number(curso));

  const gerarOpcoesAno = () => {
    if (!cursoSelecionado) return null;
    let maxAnos = 1;
    switch (cursoSelecionado.tipo?.toLowerCase()) {
      case "licenciatura": maxAnos = 3; break;
      case "mestrado":
      case "tesp": maxAnos = 2; break;
      default: maxAnos = 1;
    }
    return Array.from({ length: maxAnos }, (_, i) => (
      <option key={i + 1} value={i + 1}>{i + 1}º Ano</option>
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (curso && ano && semestre) {
      onPesquisar({
        cursoId: Number(curso),
        ano: Number(ano),
        semestre: semestre,
        turmaId: setTurmaSelecionada
      });

    } else {
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  return (
    <div className="container my-4">
      {/* Filtro de Horários */}
      <div className="card shadow-sm border mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Filtro de Horários</h5>
          <form className="row g-3" onSubmit={handleSubmit}>
            {/* Escola */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Escola</label>
              <Select
                options={escolas.map(e => ({ value: e.id, label: e.nome }))}
                value={escolas.map(e => ({ value: e.id, label: e.nome })).find(opt => opt.value === Number(escola))}
                onChange={(selected) => {
                  setEscola(selected?.value || "");
                  setCurso(""); setAno(""); setSemestre(""); setTurma("");
                }}
                placeholder="Digite ou selecione a escola"
                noOptionsMessage={() => "Nenhuma escola encontrada"}
              />
            </div>

            {/* Curso */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Curso</label>
              <Select
                options={cursosFiltrados.map(c => ({ value: c.id, label: c.nome }))}
                value={cursosFiltrados.map(c => ({ value: c.id, label: c.nome })).find(opt => opt.value === Number(curso))}
                onChange={(selected) => {
                  setCurso(selected?.value || "");
                  setAno(""); setSemestre(""); setTurma("");
                }}
                isDisabled={!escola}
                placeholder="Digite ou selecione o curso"
                noOptionsMessage={() => "Nenhum curso encontrado"}
              />
            </div>

            {/* Ano e Semestre */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">Ano académico</label>
              <select
                className="form-select"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                disabled={!curso}
              >
                <option value="">Selecione</option>
                {gerarOpcoesAno()}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Semestre/Anual</label>
              <select
                className="form-select"
                value={semestre}
                onChange={(e) => setSemestre(e.target.value)}
                disabled={!ano}
              >
                <option value="">Selecione</option>
                <option value="A">Anual</option>
                <option value="S1">1º Semestre</option>
                <option value="S2">2º Semestre</option>
              </select>
            </div>

            <div className="col-md-4 d-flex align-items-end justify-content-end">
              <button type="submit" className="btn btn-primary w-100">
                Pesquisar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Turma e Ações */}
      <div className="card shadow-sm border">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Turma e Ações</h5>
          <div className="row g-3 align-items-end">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Turma</label>
              <select
                className="form-select"
                value={turma}
                onChange={(e) => {
                  const idTurma = parseInt(e.target.value);
                  setTurma(idTurma);
                  setTurmaSelecionada(idTurma); // ✅ Agora é número
                }}
                disabled={!curso}
              >
                <option value="">Selecione a turma</option>
                {turmas.map(t => (
                  <option key={t.id} value={t.id}>{t.nome}</option>
                ))}
              </select>
            </div>

            <div className="col-md-6 d-flex justify-content-end gap-2">
              <button
                className="btn btn-success"
                disabled={!turma}
                onClick={() => {
                  if (onSalvar && turma) {
                    onSalvar(Number(turma));
                  }
                }}
              >
                <i className="bi bi-save" /> Salvar
              </button>

              <button
                className="btn btn-warning"
                disabled={!turma}
                onClick={() => {
                  if (onBloquear && turma) {
                    onBloquear(Number(turma));
                  }
                }}
              >
                <i className="bi bi-lock-fill" /> Bloquear
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PesquisaForm;
