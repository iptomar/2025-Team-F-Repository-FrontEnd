import React from "react";
import { useNavigate } from "react-router-dom"; // Se estiver usando React Router

function Navbar() {
  // Hook de navegação (opcional, se estiver usando React Router)
  const navigate = useNavigate();

  // Função para lidar com o clique no botão de login
  const entrarLogin = () => {
    // 1. Redirecionamento simples (se não precisar de lógica adicional)
    // window.location.href = '/login';
    
    // 2. Com React Router (recomendado)
    navigate('/login');
    
    // 3. Com lógica adicional (ex: verificação de autenticação)
    /*
    if (usuarioEstaLogado) {
      navigate('/perfil');
    } else {
      navigate('/login');
    }
    */
    
    // 4. Com abertura de modal (exemplo alternativo)
    // setMostrarModalLogin(true);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/horarios">HClass</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/horarios">Horários</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/turmas">Turmas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/salas">Salas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/professores">Professores</a>
            </li>
          </ul>
          <button className="btn btn-outline-light" onClick={entrarLogin}>Entrar</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;