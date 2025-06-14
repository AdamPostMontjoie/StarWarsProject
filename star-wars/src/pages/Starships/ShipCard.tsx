import React from 'react'
import { Card, Container,ListGroup, Button } from 'react-bootstrap'
import { Ship } from '../../interfaces/Ship'
import axios from 'axios'

const ShipCard = ({ship, onDelete} : {ship:Ship, onDelete:any}) => {
  async function deleteShip(e:React.MouseEvent){
    e.preventDefault()
    try{
     let response = await axios.delete(`http://localhost:5050/starships/${ship._id}`)
     console.log(response);
     onDelete(ship._id)
    }
    catch(err){
      console.log("could not delete: ", err);
      
    }
  }
  return (
    <Container>
        <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{ship.properties.name}</Card.Title>
        <ListGroup variant="flush">
        <ListGroup.Item>Class: {ship.properties.starship_class}</ListGroup.Item>
        <ListGroup.Item>Model: {ship.properties.model}</ListGroup.Item>
        <ListGroup.Item>Manufacturer: {ship.properties.manufacturer}</ListGroup.Item>
        <ListGroup.Item>Crew: {ship.properties.crew}</ListGroup.Item>
        <ListGroup.Item>Passengers: {ship.properties.passengers}</ListGroup.Item>
        <ListGroup.Item>Cargo Capacity: {ship.properties.cargo_capacity} kg</ListGroup.Item>
        <ListGroup.Item>Consumables: {ship.properties.consumables}</ListGroup.Item>
        <ListGroup.Item>Length: {ship.properties.length} meters</ListGroup.Item>
        <ListGroup.Item>Speed: {ship.properties.max_atmosphering_speed}</ListGroup.Item>
        <ListGroup.Item>MGLT: {ship.properties.MGLT}</ListGroup.Item>
        <ListGroup.Item>Hyperdrive Rating: {ship.properties.hyperdrive_rating}</ListGroup.Item>
        <ListGroup.Item>Cost in Credits: {ship.properties.cost_in_credits}</ListGroup.Item>

      </ListGroup>
      </Card.Body>
      <Button onClick={deleteShip} variant='danger'>Delete</Button>
    </Card>
    </Container>
  )
}

export default ShipCard