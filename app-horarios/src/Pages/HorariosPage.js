import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Components/Navbar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function HorariosPage() {
  const [turmas, setTurmas] = useState([]);
  const turmaRef = useRef();
  const docentesRef = useRef();
  const salasRef = useRef();

  useEffect(() => {
    const stored = localStorage.getItem("gradeBlocos");
    if (stored) {
      const all = JSON.parse(stored);
      setTurmas(all.filter((item) => item.type === "turma"));
    }
  }, []);

  const exportPDF = async (ref, filename) => {
    if (!ref.current) return;
    const input = ref.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${filename}.pdf`);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">

          {/* Turmas */}
          <h3 className="mb-4 pt-3">Turmas</h3>
          <div className="p-3 border" ref={turmaRef}>
            {turmas.map((turma, i) => (
              <div key={i} className="mb-3">
                <h5>Horário {i + 1}</h5>
                <ul>
                  {turma.data.map((b, idx) => (
                    <li key={idx}>
                      <strong>{b.nomeDisciplina}</strong> ({b.tipoAula}) - {b.professor} - {b.sala} - Dia: {b.dia}, Hora: {b.hora}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="col-2 mt-3 pb-3">
            <button onClick={() => exportPDF(turmaRef, "horario_turma")} className="btn btn-primary btn-lg">
              Exportar PDF
            </button>
          </div>

          {/* Docentes */}
          <h3 className="mb-4 pt-3">Docentes</h3>
          <div className="p-3 border" ref={docentesRef}>
            {/* Conteúdo dos docentes */}
            <p>Conteúdo dos docentes vai aqui...</p>
          </div>
          <div className="col-2 mt-3 pb-3">
            <button onClick={() => exportPDF(docentesRef, "horario_docentes")} className="btn btn-primary btn-lg">
              Exportar PDF
            </button>
          </div>

          {/* Salas */}
          <h3 className="mb-4 pt-3">Salas</h3>
          <div className="p-3 border" ref={salasRef}>
            {/* Conteúdo das salas */}
            <p>Conteúdo das salas vai aqui...</p>
          </div>
          <div className="col-2 mt-3 pb-3">
            <button onClick={() => exportPDF(salasRef, "horario_salas")} className="btn btn-primary btn-lg">
              Exportar PDF
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HorariosPage;
