import React from 'react'
import { Card, Container,ListGroup } from 'react-bootstrap'
import { FavoriteShip, nonUserShip } from '../../interfaces/Ship'

const FleetCard = ({ships} : {ships:FavoriteShip[] | nonUserShip[]}) => {
  let capitalShips = ships.filter((ship) => ship.properties.class === "Capital")
  let starfighters = ships.filter((ship) => ship.properties.class === "Starfighter")
  let bombers = ships.filter((ship) => ship.properties.class === "Bomber")
  return (
    <Container className='d-flex justify-content-center'>
        <Card  style={{ width: '18rem' }} className="border border-info rounded bg-light text-info">
              <Card.Body>
                <h6>Ugly af, change later</h6>
                <ListGroup variant="flush">
                <h4>Capital ships</h4>
                {capitalShips.map((ship) => (
                  <div>
                    <ListGroup.Item key={ship._id} className="bg-light border-0">
                      <span className="fw-bold">{ship.properties.name}</span> 
                      {' - '} 
                      <span className="text-muted small">{ship.quantity}</span>
                    </ListGroup.Item>
                  </div>
              ))}
              </ListGroup>
              <ListGroup variant="flush">
                <h4>Starfighters</h4>
                {starfighters.map((ship) => (
                  <div>
                    <ListGroup.Item key={ship._id} className="bg-light border-0">
                      <span className="fw-bold">{ship.properties.name}</span> 
                      {' - '} 
                      <span className="text-muted small">{ship.quantity}</span>
                    </ListGroup.Item>
                  </div>
              ))}
              </ListGroup>
              <ListGroup variant="flush">
                <h4>Bombers</h4>
                {bombers.map((ship) => (
                  <div>
                    <ListGroup.Item key={ship._id} className="bg-light border-0">
                      <span className="fw-bold">{ship.properties.name}</span> 
                      {' - '} 
                      <span className="text-muted small">{ship.quantity}</span>
                    </ListGroup.Item>
                  </div>
              ))}
              </ListGroup>
              </Card.Body>
            </Card>
    </Container>
  )
}

export default FleetCard