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
    const url = `${baseUrl}/api/BlocoHorarioAPI/por-curso/${cursoId}/ano/${ano}/semestre/${semestre}`;
    console.log("🔍 Requisição para:", url);

    const res = await fetch(url);
    const text = await res.text(); // lê como texto bruto primeiro

    try {
      return JSON.parse(text); // tenta converter para JSON
    } catch (e) {
      console.error("❌ Resposta não é JSON:", text);
      throw e;
    }

  } catch (err) {
    console.error("Erro ao buscar blocos:", err);
    return [];
  }
};
