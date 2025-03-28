import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HorariosPage from "./Pages/HorariosPage";
import SalasPage from "./Pages/SalasPage";
import TurmasPage from "./Pages/TurmasPage";
import ProfessoresPage from "./Pages/ProfessoresPage";
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/horarios" element={<HorariosPage />} />
          <Route path="/salas" element={<SalasPage />} />
          <Route path="/turmas" element={<TurmasPage />} />
          <Route path="/professores" element={<ProfessoresPage />} />
          {/* Adicione outras rotas aqui */}
        </Routes>
      </Router>


    </div>
  );
}

export default App;
