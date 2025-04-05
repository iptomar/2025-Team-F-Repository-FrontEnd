const XLSX = require("xlsx");

// Dados simulados (você pode trocar pelos seus filtrados)
const dados = [
  { localizacao: "PT", escola: "Escola A", curso: "Informática", ano: "2025", turma: "A", sala: "101" },
  { localizacao: "PT", escola: "Escola B", curso: "Informática", ano: "2025", turma: "B", sala: "102" },
  { localizacao: "PT", escola: "Escola B", curso: "Informática", ano: "2025", turma: "B", sala: "102" },
];

// Transforma o JSON em uma planilha
const planilha = XLSX.utils.json_to_sheet(dados);

// Cria um novo workbook e adiciona a planilha
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, planilha, "Horários");

// Salva o arquivo Excel
XLSX.writeFile(workbook, "dados_filtrados.xlsx");

console.log("✅ Arquivo 'dados_filtrados.xlsx' exportado com sucesso!");
