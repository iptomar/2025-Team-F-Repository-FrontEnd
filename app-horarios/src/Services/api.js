export const fetchLocalizacoes = async () => {
  const res = await fetch("https://dbe7-194-210-240-106.ngrok-free.app/api/LocalizacaoAPI");
  return await res.json();
};

export const fetchEscolas = async () => {
  const res = await fetch("https://dbe7-194-210-240-106.ngrok-free.app/api/EscolaAPI");
  return await res.json();
};

export const fetchCursos = async () => {
  const res = await fetch("https://dbe7-194-210-240-106.ngrok-free.app/api/CursoAPI");
  return await res.json();
};

export const fetchSalas = async () => {
  const res = await fetch("https://dbe7-194-210-240-106.ngrok-free.app/api/SalaAPI");
  return await res.json();
};

export const fetchTurmas = async () => {
  const res = await fetch("https://dbe7-194-210-240-106.ngrok-free.app/api/TurmaAPI");
  return await res.json();
};

export const postBlocosHorarios = async () => {
  const res = await fetch("https://dbe7-194-210-240-106.ngrok-free.app/api/TurmaAPI");
  return await res.json();
};

// Services/api.js

export const fetchBlocos = async (cursoId, ano, semestre) => {
  try {
    const response = await fetch(`https://dbe7-194-210-240-106.ngrok-free.app/api/BlocoHorarioAPI/por-curso/${cursoId}/ano/${ano}/semestre/${semestre}`);
    if (!response.ok) throw new Error("Erro ao buscar blocos");
    return await response.json();
  } catch (err) {
    console.error("Erro ao buscar blocos:", err);
    return [];
  }
};

