const baseUrl = "https://api-horarios.onrender.com";

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

export const fetchTurmas = async () => {
  const res = await fetch(`${baseUrl}/api/TurmaAPI`);
  return await res.json();
};
export const fetchUsers = async () => {
  const res = await fetch(`${baseUrl}/api/UserAPI`);
  return await res.json();
};

export const fetchBlocos = async (cursoId, ano, semestre) => {
  const url = `${baseUrl}/api/BlocoAulaAPI/por-curso/${cursoId}/ano/${ano}/semestre/${semestre}`;
  console.log("🔍 Requisição para:", url);

  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.warn(`Resposta HTTP não OK: ${res.status} ${res.statusText}`);
      return [];
    }

    // Tenta converter direto para JSON
    const data = await res.json();

    // Garante que sempre retorna array
    if (Array.isArray(data)) {
      return data;
    } else {
      console.warn("Resposta JSON não é um array:", data);
      return [];
    }

  } catch (err) {
    console.error("Erro ao buscar blocos:", err);
    return [];
  }
};

