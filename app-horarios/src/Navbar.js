import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">HClass</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#horarios">Horários</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#turmas">Turmas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#salas">Salas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#professores">Professores</a>
            </li>
          </ul>
          <button className="btn btn-outline-light">Entrar</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
