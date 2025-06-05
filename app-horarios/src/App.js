import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HorariosPage from "./Pages/HorariosPage";
import SalasPage from "./Pages/SalasPage";
import TurmasPage from "./Pages/TurmasPage";
import ProfessoresPage from "./Pages/ProfessoresPage";
import Blocos from "./Components/Blocos";
import Login from "./Pages/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} /> {/* Página inicial */}
        <Route path="/login" element={<Login />} />
        <Route path="/horarios" element={<HorariosPage />} />
        <Route path="/salas" element={<SalasPage />} />
        <Route path="/turmas" element={<TurmasPage />} />
        <Route path="/professores" element={<ProfessoresPage />} />
        <Route path="/blocos" element={<Blocos />} />
      </Routes>
    </Router>
  );
}

export default App;
