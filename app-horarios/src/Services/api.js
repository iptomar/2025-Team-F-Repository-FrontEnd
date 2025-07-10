const baseUrl = "https://api-horarios.onrender.com/api";

export const fetchLocalizacoes = async () => {
  const res = await fetch(`${baseUrl}/LocalizacaoAPI`);
  return await res.json();
};

export const fetchEscolas = async () => {
  const res = await fetch(`${baseUrl}/EscolaAPI`);
  return await res.json();
};

export const fetchCursos = async () => {
  const res = await fetch(`${baseUrl}/CursoAPI`);
  return await res.json();
};

export const fetchTurmas = async () => {
  const res = await fetch(`${baseUrl}/TurmaAPI`);
  return await res.json();
};

export const fetchSalas = async () => {
  const res = await fetch(`${baseUrl}/SalaAPI`);
  return await res.json();
};

export async function fetchTurmasPorCurso(cursoId) {
  const response = await fetch(`${baseUrl}/TurmaAPI/curso/${cursoId}`);
  if (!response.ok) throw new Error("Erro ao buscar turmas");
  return await response.json();
}


export const fetchUsers = async () => {
  const res = await fetch(`${baseUrl}/UtilizadorAPI`);
  return await res.json();
};

export const fetchProfessores = async () => {
  const res = await fetch(`${baseUrl}/ProfessorAPI`);
  return await res.json();
};

export async function loginUser(email, password) {
  const response = await fetch(`${baseUrl}/LoginAPI/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Erro ao fazer login');
  }

  return await response.json();
}


export const fetchBlocos = async (cursoId, ano, semestre) => {
  const url = `${baseUrl}/BlocoAulaAPI/por-curso/${cursoId}/ano/${ano}/semestre/${semestre}`;
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


export async function salvarHorarioDTO(dto) {
  const response = await fetch("https://api-horarios.onrender.com/api/HorarioAPI/salvar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dto)
  });

  if (!response.ok) {
    const erro = await response.text();
    console.error("❌ Erro do backend:", erro);
    throw new Error("Erro ao salvar horário.");
  }

  return await response.text();
}

export const bloquearHorario = async (horarioId) => {
  const response = await fetch(`https://api-horarios.onrender.com/api/HorarioAPI/${horarioId}/bloquear`, {
    method: "PUT"
  });

  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro?.title || "Erro ao bloquear horário.");
  }

  return await response.text(); // ou response.json() se preferires
};

export const obterHorarioPorTurma = async (turmaId) => {
  const response = await fetch(`https://api-horarios.onrender.com/api/HorarioAPI/turma/${turmaId}`);
  if (!response.ok) throw new Error("Não foi possível obter o horário.");
  return await response.json(); // Isso retorna os blocos, cada um com horarioId
};



export const fetchHorariosPorLocalidade = async (localidadeId) => {
  const res = await fetch(`${baseUrl}/HorarioAPI/por-localidade/${localidadeId}`);
  if (!res.ok) throw new Error("Erro ao buscar horários por localidade");
  return await res.json();
};

export const fetchHorariosPorEscola = async (escolaId) => {
  const res = await fetch(`${baseUrl}/HorarioAPI/por-escola/${escolaId}`);
  if (!res.ok) throw new Error("Erro ao buscar horários por escola");
  return await res.json();
};

export const fetchHorariosPorCurso = async (cursoId) => {
  const res = await fetch(`${baseUrl}/HorarioAPI/por-curso/${cursoId}`);
  if (!res.ok) throw new Error("Erro ao buscar horários por curso");
  return await res.json();
};

export const fetchHorariosPorSala = async (salaId) => {
  const res = await fetch(`${baseUrl}/HorarioAPI/por-sala/${salaId}`);
  if (!res.ok) throw new Error("Erro ao buscar horários por sala");
  return await res.json();
};

export const fetchHorariosPorProfessor = async (professorId) => {
  const res = await fetch(`${baseUrl}/HorarioAPI/por-professor/${professorId}`);
  if (!res.ok) throw new Error("Erro ao buscar horários por professor");
  return await res.json();
};
