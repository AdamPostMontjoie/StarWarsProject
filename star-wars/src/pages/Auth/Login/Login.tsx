import { Button, Form, Container } from 'react-bootstrap';
import TopNav from '../../../components/TopNav';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/authContext';
import { doSignInWithEmailAndPassword } from '../../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { userLoggedIn, loading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn && !loading) {
      navigate('/', { replace: true });
    }
  }, [userLoggedIn, loading, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSigningIn) return;
    setIsSigningIn(true);
    try {
      await doSignInWithEmailAndPassword(email, password);
    } catch (err: any) {
      console.error("Login Error:", err);
      if (err.message === "Firebase: Error (auth/invalid-credential).") {
        setLoginError("Incorrect email or password");
      } else {
        setLoginError(err.message || "An unknown error occurred.");
      }
    }
    setIsSigningIn(false);
  }

  return (
    <div className='login-page-container'>
      <TopNav />
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="login-card p-4">
          <h1 className="login-heading text-center mb-4">Login</h1>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSigningIn}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSigningIn}
              />
            </Form.Group>

            {loginError && <p className="login-error-message mt-3">{loginError}</p>}

            <Button variant="primary" type="submit" disabled={isSigningIn} className="w-100 mt-3">
              {isSigningIn ? 'Logging in...' : 'Submit'}
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Login;