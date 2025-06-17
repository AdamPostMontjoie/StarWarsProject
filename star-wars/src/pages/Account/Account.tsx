import React from 'react'
import TopNav from '../../components/TopNav'
import { Container } from 'react-bootstrap';
import { useAuth } from '../../contexts/authContext';


const Account = () => {
  const {currentUser, userLoggedIn} = useAuth()

  return (
    <Container>
      <TopNav/>
     {userLoggedIn && currentUser && (
      <div>
        <h1>Your account info</h1>
        <h1>Email: {currentUser.email}</h1> 
        <h5>I'd add more but who cares</h5>
      </div>
      )}
    </Container>
  )
}

export default Account