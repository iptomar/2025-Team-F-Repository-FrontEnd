const dados = [
    { localizacao: "PT", escola: "Escola A", curso: "Informática", ano: "2025", turma: "A", sala: "101" },
    { localizacao: "PT", escola: "Escola B", curso: "Informática", ano: "2025", turma: "B", sala: "102" },
    { localizacao: "PT", escola: "Escola B", curso: "Informática", ano: "2025", turma: "B", sala: "102" },
  ];
  
  // Filtros definidos manualmente (pode vir de input, args, ou outro JSON)
  const filtros = {
    localizacao: "PT",
    escola: "",
    curso: "Informática",
    ano: "",
    turma: "",
    sala: ""
  };
  
  const resultados = dados.filter((item) => {
    return (!filtros.localizacao || item.localizacao === filtros.localizacao) &&
           (!filtros.escola || item.escola === filtros.escola) &&
           (!filtros.curso || item.curso === filtros.curso) &&
           (!filtros.ano || item.ano === filtros.ano) &&
           (!filtros.turma || item.turma === filtros.turma) &&
           (!filtros.sala || item.sala === filtros.sala);
  });
  
  console.log("Resultados filtrados:");
  console.table(resultados);
  