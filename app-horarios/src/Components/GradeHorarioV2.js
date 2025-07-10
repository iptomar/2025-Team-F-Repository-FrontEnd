import React from "react";

const diasSemana = [
  { id: 1, nome: "Segunda" },
  { id: 2, nome: "Terça" },
  { id: 3, nome: "Quarta" },
  { id: 4, nome: "Quinta" },
  { id: 5, nome: "Sexta" },
  { id: 6, nome: "Sábado" },
];

const horas = Array.from({ length: 20 }, (_, i) => {
  const hora = String(Math.floor(i / 2) + 8).padStart(2, "0");
  const minuto = i % 2 === 0 ? "00" : "30";
  const inicio = `${hora}:${minuto}`;
  const proximaHora = i % 2 === 0 ? `${hora}:30` : `${String(Number(hora) + 1).padStart(2, "0")}:00`;
  return `${inicio} - ${proximaHora}`;
});

function calcularRowSpan(bloco) {
  const [hIni, mIni] = bloco.horaInicio.split(":").map(Number);
  const [hFim, mFim] = bloco.horaFim.split(":").map(Number);
  const minutosInicio = hIni * 60 + mIni;
  const minutosFim = hFim * 60 + mFim;
  return Math.ceil((minutosFim - minutosInicio) / 30);
}

function GradeHorarioV2({ blocos = [] }) {
  const blocosRenderizados = new Set();

  return (
    <div className="table-responsive mt-4">
      <table
        className="table table-bordered text-center align-middle table-sm"
        style={{ tableLayout: "fixed", width: "100%" , fontSize: "14px" }}
      >
        <thead className="table-light">
          <tr>
            <th style={{ width: "100px" }}>Hora</th>
            {diasSemana.map((dia) => (
              <th key={dia.id} style={{ width: `${100 / diasSemana.length}%` }}>
                {dia.nome}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horas.map((intervalo) => {
            const horaInicioIntervalo = intervalo.split(" - ")[0];
            return (
              <tr key={intervalo} style={{ height: "40px" }}>
                <td className="fw-bold" style={{ width: "100px", height: "40px" }}>
                  {intervalo}
                </td>
                {diasSemana.map((dia) => {
                  const bloco = blocos.find(
                    (b) =>
                      b.dia === dia.id &&
                      b.horaInicio <= horaInicioIntervalo &&
                      b.horaFim > horaInicioIntervalo
                  );

                  if (bloco) {
                    if (!blocosRenderizados.has(bloco.id)) {
                      const rowSpan = calcularRowSpan(bloco);
                      blocosRenderizados.add(bloco.id);

                      return (
                        <td
                          key={`${dia.id}-${intervalo}`}
                          rowSpan={rowSpan}
                          style={{
                            backgroundColor: "#1976D2",
                            verticalAlign: "top",
                            textAlign: "center",
                            color: "white",
                            height: `${rowSpan * 40}px`, // altura fixa por número de linhas
                          }}
                          className="align-top p-1"
                        >
                          <div className="bloco-conteudo">
                            <strong>{bloco.disciplina || "—"}</strong>
                            <hr style={{ borderColor: "white", margin: "2px 0" }} />
                            {bloco.tipoAula && bloco.tipoAula !== "—" && (
                              <>
                                ({bloco.tipoAula})
                                <br />
                              </>
                            )}
                            {bloco.professores && (
                              <>
                                <strong>{bloco.professores}</strong>
                                <br />
                              </>
                            )}
                            {bloco.sala && bloco.sala !== "—" && (
                              <>
                                {bloco.sala}
                              </>
                            )}
                          </div>
                        </td>
                      );
                    } else {
                      return null; // já renderizado
                    }
                  } else {
                    return <td key={`${dia.id}-${intervalo}`} style={{ height: "40px" }}></td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default GradeHorarioV2;
