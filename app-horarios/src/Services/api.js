export const fetchLocalizacoes = async () => {
  const res = await fetch("http://localhost:5281/api/LocalizacaoAPI");
  return await res.json();
};

export const fetchEscolas = async () => {
  const res = await fetch("http://localhost:5281/api/EscolaAPI");
  return await res.json();
};

export const fetchCursos = async () => {
  const res = await fetch("http://localhost:5281/api/CursoAPI");
  return await res.json();
};

export const fetchSalas = async () => {
  const res = await fetch("http://localhost:5281/api/SalaAPI");
  return await res.json();
};

export const fetchTurmas = async () => {
  const res = await fetch("http://localhost:5281/api/TurmaAPI");
  return await res.json();
};

export const postBlocosHorarios = async () => {
  const res = await fetch("http://localhost:5281/api/TurmaAPI");
  return await res.json();
};

const handlePesquisar = async () => {
  const response = await fetch(`/api/BlocoHorarioAPI/porCursoAnoSemestre?cursoId=${curso}&ano=${ano}&semestre=${semestre}`);
  const blocos = await response.json();
  setBlocos(blocos);
};
