import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotLoggedIn = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleGoToRegister = () => {
    navigate('/register');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card className="text-center shadow-lg" style={{ width: '22rem' }}>
        <Card.Body>
          <Card.Title as="h2" className="mb-3 text-danger">Not Logged In</Card.Title>
          <Card.Text className="mb-4">
            You must be logged in to view this page.
          </Card.Text>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={handleGoToLogin}>
              Log In
            </Button>
            <Button variant="outline-success" size="lg" onClick={handleGoToRegister}>
              Sign Up
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NotLoggedIn;