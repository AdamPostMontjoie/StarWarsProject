import React from 'react'
import { Card, Container,ListGroup, Button } from 'react-bootstrap'
import { FavoriteShip } from '../../interfaces/Ship'

  

const ShipCard = ({ship, onDelete} : {ship:FavoriteShip, onDelete:any}) => {

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (onDelete) {
      onDelete(ship.properties.name);
    }
  };
  return (
    <Container>
        <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{ship.properties.model}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Quantity: {ship.quantity}</Card.Subtitle>
        <ListGroup variant="flush">
        <ListGroup.Item>Class: {ship.properties.starship_class}</ListGroup.Item>
        <ListGroup.Item>Common Name: {ship.properties.name}</ListGroup.Item>
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
      <Button onClick={handleDeleteClick} variant='danger'>Delete</Button>
    </Card>
    </Container>
  )
}

export default ShipCard