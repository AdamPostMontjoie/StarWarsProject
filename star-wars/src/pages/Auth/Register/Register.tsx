import { Button, Form, Container } from 'react-bootstrap';
import TopNav from '../../../components/TopNav';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import axios from 'axios';

function Register() {
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  async function onSubmit(e:React.FormEvent){
    e.preventDefault()
    try{
      const userCred = await doCreateUserWithEmailAndPassword(email,password)
      const newUser = userCred.user;
      //await email verification, display something to let users know
      
      const user = {
        uid:newUser.uid,
        email:email,
        friends: []
      }
      const result = axios.post('https://starwars-backend-z23b.onrender.com/users', user)
      console.log(result);
      
    }
    catch(err){
      console.error("there was a problem", err)
    }
  }
  const {userLoggedIn,  loading} = useAuth()
  
  const navigate = useNavigate();
  
    useEffect(() => {
      if (userLoggedIn && !loading) {
        navigate('/account', { replace: true });
      }
    }, [userLoggedIn, loading, navigate]); 
  return (
    <div>
      <TopNav/>
    <Container>
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
    </div>
  );
}

export default Register;