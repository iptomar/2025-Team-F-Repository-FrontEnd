// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HorariosPage from "./Pages/HorariosPage";
import SalasPage from "./Pages/SalasPage";
import TurmasPage from "./Pages/TurmasPage";
import ProfessoresPage from "./Pages/ProfessoresPage";
import Blocos from "./Components/Blocos";
import Login from "./Pages/Login";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Rotas protegidas */}
        <Route path="/horarios" element={
          <PrivateRoute><HorariosPage /></PrivateRoute>
        } />
        <Route path="/salas" element={
          <PrivateRoute><SalasPage /></PrivateRoute>
        } />
        <Route path="/turmas" element={
          <PrivateRoute><TurmasPage /></PrivateRoute>
        } />
        <Route path="/professores" element={
          <PrivateRoute><ProfessoresPage /></PrivateRoute>
        } />
        <Route path="/blocos" element={
          <PrivateRoute><Blocos /></PrivateRoute>
        } />
        
        {/* Fallback para login se rota inválida */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
