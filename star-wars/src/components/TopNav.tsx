import { useAuth } from '../contexts/authContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { doSignOut } from '../firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';


function TopNav() {
  const {userLoggedIn, loading} = useAuth()
  async function signOut(){
    try{
      await doSignOut()
    }
    catch(err){
      console.error("couldn't sign out", err)
    }
  }

  return(
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Star Wars App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/characters">My Characters</Nav.Link>
            <Nav.Link href="/starships">My Starships</Nav.Link>
            <Nav.Link href="/about">About Page</Nav.Link>
          </Nav>
          {!userLoggedIn && !loading && (
            <Nav>
            {/*will only display signup link while logged out once account system exists */}   
              <Nav.Link href="/login">Log In</Nav.Link>
              <Nav.Link href="/register">Sign Up</Nav.Link>
            {/* only display when logged in */}
          </Nav>
          )}
          {userLoggedIn && !loading && (
            <Nav>
              <Nav.Link href='/account'>Account Page </Nav.Link>
              <Nav.Link href='/' onClick={signOut}>Log Out</Nav.Link>
          </Nav>
            )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav;