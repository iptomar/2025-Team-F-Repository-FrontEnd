import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (username === 'admin' && password === '1234') {
      localStorage.setItem('loggedInUser', username);
      navigate('/horarios');
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Card className="shadow-lg" style={{ width: '100%', maxWidth: '800px' }}>
        <Row className="h-100">
          {/* Lado da imagem */}
          <Col md={6} className="d-none d-md-block p-0 d-flex align-items-center">
            <img
              src="https://www.ipt.pt/img/logo-ipt-share.png"
              alt="Logo IPT"
              className="img-fluid p-3"
              style={{
                maxHeight: '400px',
                width: '100%',
                objectFit: 'contain'
              }}
            />
          </Col>

          {/* Lado do formulário */}
          <Col md={6} className="p-5 d-flex flex-column justify-content-center">
            <div className="text-center mb-4">
              <h2 className="fw-bold">Login</h2>
            </div>

            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}

              <Button variant="primary" className="w-100" onClick={handleLogin}>
                Entrar
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default Login;
