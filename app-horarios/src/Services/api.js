const baseUrl = "https://dbe7-194-210-240-106.ngrok-free.app";

export const fetchLocalizacoes = async () => {
  const res = await fetch(`${baseUrl}/api/LocalizacaoAPI`);
  return await res.json();
};

export const fetchEscolas = async () => {
  const res = await fetch(`${baseUrl}/api/EscolaAPI`);
  return await res.json();
};

export const fetchCursos = async () => {
  const res = await fetch(`${baseUrl}/api/CursoAPI`);
  return await res.json();
};

export const fetchBlocos = async (cursoId, ano, semestre) => {
  try {
    const res = await fetch(`${baseUrl}/api/BlocoHorarioAPI/por-curso/${cursoId}/ano/${ano}/semestre/${semestre}`);
    if (!res.ok) throw new Error("Erro ao buscar blocos");
    return await res.json();
  } catch (err) {
    console.error("Erro ao buscar blocos:", err);
    return [];
  }
};
