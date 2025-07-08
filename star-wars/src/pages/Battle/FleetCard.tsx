import React from 'react'
import { Card, Container,ListGroup } from 'react-bootstrap'
import { FavoriteShip, nonUserShip } from '../../interfaces/Ship'

const FleetCard = ({ships} : {ships:FavoriteShip[] | nonUserShip[]}) => {
  return (
    <Container className='d-flex justify-content-center'>
        <Card style={{ width: '18rem' }}>
              <Card.Body>
                <ListGroup variant="flush">
                {ships.map((ship) =>(
                    <ListGroup.Item key={ship._id}>{ship.properties.model} - {ship.quantity}</ListGroup.Item>
                ))}
              </ListGroup>
              </Card.Body>
            </Card>
    </Container>
  )
}

export default FleetCard