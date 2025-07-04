import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container, Button } from 'react-bootstrap';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('loggedInUser');
  const isHorariosPage = location.pathname === '/horarios';

   const user = isLoggedIn ? JSON.parse(localStorage.getItem('loggedInUser')) : null;

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BSNavbar.Brand as={Link} to="/home">
          IPT Horários
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && (
              <>
                
                <Nav.Link as={Link} to="/home">Horários</Nav.Link>
                <Nav.Link as={Link} to="/turmas">Marcar</Nav.Link>
                <Nav.Link as={Link} to="/horarios">Exportar</Nav.Link>
                
              </>
            )}
          </Nav>
          {isLoggedIn ? (
            <>
                <span className="text-light me-3">
                  Olá, <strong>{user?.nome || user?.email}</strong>
                </span>
                <Button variant="outline-light" onClick={handleLogout}>
                  Sair
                </Button>
              </>
          ) : (
            isHorariosPage && (
              <Button variant="outline-light" onClick={handleLogin}>
                Entrar
              </Button>
            )
          )}
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;
