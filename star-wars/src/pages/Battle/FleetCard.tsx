import React from 'react'
import { Card, Container,ListGroup } from 'react-bootstrap'
import { FavoriteShip, nonUserShip } from '../../interfaces/Ship'

const FleetCard = ({ships} : {ships:FavoriteShip[] | nonUserShip[]}) => {
  return (
    <Container className='d-flex justify-content-center'>
        <Card  style={{ width: '18rem' }} className="border border-info rounded bg-light text-info">
              <Card.Body>
                <ListGroup variant="flush">
                {ships.map((ship) => (
              <ListGroup.Item key={ship._id} className="bg-light border-0">
                <span className="fw-bold">{ship.properties.model}</span> 
                {' - '} 
                <span className="text-muted small">{ship.quantity}</span>
              </ListGroup.Item>
            ))}
              </ListGroup>
              </Card.Body>
            </Card>
    </Container>
  )
}

export default FleetCard