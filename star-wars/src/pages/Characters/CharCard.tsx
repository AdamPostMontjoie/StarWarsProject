import React from 'react'
import { Card, Container,ListGroup, Button } from 'react-bootstrap'
import { Character } from '../../interfaces/Character'
import axios from 'axios'

const CharCard = ({character, onDelete} : {character:Character, onDelete:any}) => {
  async function deleteChar(e:React.MouseEvent){
    e.preventDefault()
    try{
     let response = await axios.delete(`http://localhost:5050/characters/${character._id}`)
     console.log(response);
     onDelete(character._id)
    }
    catch(err){
      console.log("could not delete: ", err);
      
    }
  }
  return (
    <Container>
        <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{character.properties.name}</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>Birth Year: {character.properties.birth_year}</ListGroup.Item>
            <ListGroup.Item>Eye Color: {character.properties.eye_color}</ListGroup.Item>
            <ListGroup.Item>Gender: {character.properties.gender}</ListGroup.Item>
            <ListGroup.Item>Hair Color: {character.properties.hair_color}</ListGroup.Item>
            <ListGroup.Item>Height: {character.properties.height} cm</ListGroup.Item>
            <ListGroup.Item>Mass: {character.properties.mass} kg</ListGroup.Item>
            <ListGroup.Item>Skin Color: {character.properties.skin_color}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Button onClick={deleteChar} variant='danger'>Delete</Button>
    </Card>
    </Container>
  )
}

export default CharCard