// src/Pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

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

    console.log('Login attempt with:', { username, password });

    // Reset form
    setUsername('');
    setPassword('');
    setError('');

    // Redireciona para a página de horários
    navigate('/horarios');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow" style={{ width: '400px' }}>
        <div className="text-center mb-4">
          <img 
            src="https://www.ipt.pt/img/logo-ipt-share.png" 
            alt="IPT Logo" 
            style={{ width: '150px', marginBottom: '1.5rem' }} 
          />
          <h2 className="mb-4">Login</h2>
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

          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

          <Button 
            variant="primary" 
            className="w-100 mb-3"
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;
