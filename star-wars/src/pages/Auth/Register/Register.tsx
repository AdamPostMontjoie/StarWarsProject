import { Button, Form, Container } from 'react-bootstrap';
import TopNav from '../../../components/TopNav';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword,doSignInWithEmailAndPassword } from '../../../firebase/auth';

function Register() {
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  async function onSubmit(e:React.FormEvent){
    e.preventDefault()
    try{
      await doCreateUserWithEmailAndPassword(email,password)
      await doSignInWithEmailAndPassword(email,password)
    }
    catch(err){
      console.error("there was a problem", err)
    }
  }
  const {userLoggedIn, loading} = useAuth()
  
  const navigate = useNavigate();
  
    useEffect(() => {
      if (userLoggedIn && !loading) {
        navigate('/account', { replace: true });
      }
    }, [userLoggedIn, loading, navigate]); 
    if (loading) {
      return (
        <Container>
          <TopNav />
          <h1>Checking authentication status...</h1>
        </Container>
      );
  } 
  return (
    <Container>
      <TopNav/>
      <h1>Create an account</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label >Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Register;