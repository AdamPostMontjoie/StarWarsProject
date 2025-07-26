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
        <ListGroup.Item>Class: {ship.properties.class}</ListGroup.Item>
        <ListGroup.Item>Common Name: {ship.properties.name}</ListGroup.Item>

      </ListGroup>
      </Card.Body>
      <Button onClick={handleDeleteClick} variant='danger'>Delete</Button>
    </Card>
    </Container>
  )
}

export default ShipCard