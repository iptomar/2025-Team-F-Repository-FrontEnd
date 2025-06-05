import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container, Button } from 'react-bootstrap';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('loggedInUser');

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BSNavbar.Brand as={Link} to="/horarios">
          IPT Horários
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/horarios">Horários</Nav.Link>
                <Nav.Link as={Link} to="/salas">Salas</Nav.Link>
                <Nav.Link as={Link} to="/turmas">Turmas</Nav.Link>
                <Nav.Link as={Link} to="/professores">Professores</Nav.Link>
              </>
            )}
          </Nav>
          {isLoggedIn && (
            <Button variant="outline-light" onClick={handleLogout}>
              Sair
            </Button>
          )}
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;
