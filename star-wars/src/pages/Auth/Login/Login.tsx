import { Button, Form, Container } from 'react-bootstrap';
import TopNav from '../../../components/TopNav';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/authContext';
import { doSignInWithEmailAndPassword } from '../../../firebase/auth';
import { useNavigate } from 'react-router-dom'; 

function Login() {
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError,setLoginError] = useState("")
  const [isSigningIn, setIsSigningIn] = useState(false)
  const {userLoggedIn, loading} = useAuth()

  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn && !loading) {
      navigate('/account', { replace: true });
    }
  }, [userLoggedIn, loading, navigate]); 

  async function onSubmit(e:React.FormEvent){
    e.preventDefault();
    if (isSigningIn) return; 
    setIsSigningIn(true);
    try{
      await doSignInWithEmailAndPassword(email,password)
    }
    catch(err: any){
      console.error("Login Error:", err);
      if(err.message === "Firebase: Error (auth/invalid-credential)."){
        setLoginError("Incorrect email or password")
      }else {
        setLoginError(err.message || "An unknown error occurred.");
      }
    }
      setIsSigningIn(false); 
  }

  return (
    <div>
    <TopNav/>
    <Container>
      
      <h1>Login to your account</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label >Email address</Form.Label>
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

        {loginError && <p style={{ color: 'red', marginTop: '10px' }}>{loginError}</p>}

        <Button variant="primary" type="submit" disabled={isSigningIn}>
          {isSigningIn ? 'Logging in...' : 'Submit'}
        </Button>
      </Form>
    </Container>
    </div>
  );
}

export default Login;