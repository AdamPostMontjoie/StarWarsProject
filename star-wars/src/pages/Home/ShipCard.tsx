import React from 'react'
import { Card, Container,ListGroup, Button } from 'react-bootstrap'
import axios from 'axios'
import { Ship } from '../../interfaces/Ship'

const ShipCard = ({ship} : {ship:Ship}) => {

  async function postShip(){
    try{
      const backendResponse = await axios.post("http://localhost:5050/starships", ship.properties)
      console.log(backendResponse);     
    }
    catch(error){
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          alert("This starship already exists in the database!");
          console.warn("Duplicate starship:", error.response.data.message); // Log the specific message from your backend
        } else {
          alert(`Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
          console.error("Backend error:", error.response.status, error.response.data);
        }
    }
  }
  }
  return (
    <Container>
        <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{ship.properties.name}</Card.Title>
        <ListGroup variant="flush">
        <ListGroup.Item>Class: {ship.properties.starship_class}</ListGroup.Item>
        <ListGroup.Item>Crew: {ship.properties.crew}</ListGroup.Item>
        <ListGroup.Item>Speed: {ship.properties.max_atmosphering_speed}</ListGroup.Item>
      </ListGroup>
      </Card.Body>
      <Button onClick={postShip}>Add to Favorites</Button>
    </Card>
    </Container>
  )
}

export default ShipCard