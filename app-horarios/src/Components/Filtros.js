import React, { useEffect, useState } from "react";
import { fetchLocalizacoes, fetchEscolas, fetchCursos } from "../Services/api";

function Filtros() {
  const [localizacoes, setLocalizacoes] = useState([]);
  const [escolas, setEscolas] = useState([]);
  const [cursos, setCursos] = useState([]);

  const [filtros, setFiltros] = useState({
    localizacao: "PT",
    escola: "",
    curso: "Informática",
    ano: "",
    turma: "",
    sala: ""
  });

  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [locs, escolas, cursos] = await Promise.all([
          fetchLocalizacoes(),
          fetchEscolas(),
          fetchCursos()
        ]);

        setLocalizacoes(locs);
        setEscolas(escolas);
        setCursos(cursos);

        // You could also store them all in one state if preferred
        filterResults({ locs, escolas, cursos });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

  const filterResults = ({ locs, escolas, cursos }) => {
    // Combine or join/filter the arrays as necessary depending on their structure
    const allData = [...escolas]; // or merge multiple arrays if needed

    const filtered = allData.filter((item) => {
      return (!filtros.localizacao || item.localizacao === filtros.localizacao) &&
             (!filtros.escola || item.nome === filtros.escola) &&
             (!filtros.curso || item.curso === filtros.curso) &&
             (!filtros.ano || item.ano === filtros.ano) &&
             (!filtros.turma || item.turma === filtros.turma) &&
             (!filtros.sala || item.sala === filtros.sala);
    });

    setResultados(filtered);
    console.log("🎯 Resultados filtrados:");
    console.table(filtered);
  };

  return (
    <div>
      <h4>Filtros</h4>
      {/* Add dropdowns for each filter as needed, and onChange update `filtros` */}
    </div>
  );
}

export default Filtros;
