import { Button, Form, Container } from 'react-bootstrap';
import TopNav from '../../../components/TopNav';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import axios from 'axios';
import './Register.css';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [registerError, setRegisterError] = useState("");
  
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSigningUp) return;
    setIsSigningUp(true);
    try {
      const userCred = await doCreateUserWithEmailAndPassword(email, password);
      const newUser = userCred.user;
      //await email verification, display something to let users know
      const user = {
        uid: newUser.uid,
        email: email,
        ships: []
      };
      const result = await axios.post('https://starwars-backend-z23b.onrender.com/users', user);
      console.log(result);
    } catch (err: any) {
      console.error("there was a problem", err);
      setRegisterError(err.message || "An unknown error occurred.");
    }
    setIsSigningUp(false);
  }
  
  const { userLoggedIn, loading } = useAuth();
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (userLoggedIn && !loading) {
      navigate('/', { replace: true });
    }
  }, [userLoggedIn, loading, navigate]);
  
  return (
    <div className='login-page-container'>
      <TopNav />
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="login-card p-4">
          <h1 className="login-heading text-center mb-4">Create An Account</h1>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSigningUp}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSigningUp}
              />
            </Form.Group>

            {registerError && <p className="login-error-message mt-3">{registerError}</p>}
            
            <Button variant="primary" type="submit" disabled={isSigningUp} className="w-100 mt-3">
              {isSigningUp ? 'Creating account...' : 'Submit'}
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Register;