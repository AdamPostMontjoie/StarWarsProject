import React from 'react'
import { Card, Container,ListGroup, Button } from 'react-bootstrap'
import axios from 'axios';
import { Character } from '../../interfaces/Character';
import { useAuth } from '../../contexts/authContext';

const CharCard = ({character} : {character:Character}) => {
  const {userLoggedIn,currentUser} = useAuth()

  async function postChar(){
    if(userLoggedIn){
      const userChar = {
        uid:currentUser.uid,
        properties:character.properties
      }
      try{
        const backendResponse = await axios.post("http://localhost:5050/characters", userChar)
        console.log(backendResponse);
      }
      catch(error){
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 409) {
            alert("This character already exists in the database!");
            console.warn("Duplicate character", error.response.data.message); // Log the specific message from your backend
          } else {
            alert(`Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
            console.error("Backend error:", error.response.status, error.response.data);
          }
      }
    }
    } else{
      alert("You need to be logged in to add to favorites")
    }
    
  }

  return (
    <Container>
        <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{character.properties.name}</Card.Title>
        <ListGroup variant="flush">
        <ListGroup.Item>Born: {character.properties.birth_year}</ListGroup.Item>
        <ListGroup.Item>Gender: {character.properties.gender}</ListGroup.Item>
        <ListGroup.Item>Height: {character.properties.height}</ListGroup.Item>
      </ListGroup>
      </Card.Body>
      <Button onClick={postChar}>Add to Favorites</Button>
    </Card>
    </Container>
  )
}

export default CharCard