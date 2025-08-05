import React from 'react'
import { Card, Container,ListGroup } from 'react-bootstrap'
import { FavoriteShip, nonUserShip } from '../interfaces/Ship';
import './FleetCard.css'; // Import the new CSS file

const FleetCard = ({ships} : {ships:FavoriteShip[] | nonUserShip[]}) => {
  let capitalShips = ships.filter((ship) => ship.properties.class === "Capital")
  let starfighters = ships.filter((ship) => ship.properties.class === "Starfighter")
  let bombers = ships.filter((ship) => ship.properties.class === "Bomber")
  return (
        <Card className="fleet-card-container rounded">
              <Card.Body className="fleet-card-body">
                {capitalShips.length > 0 &&(
                <ListGroup variant="flush">
                <h4 className="fleet-card-heading">Capital Ships</h4>
                {capitalShips.map((ship) => (
                    <ListGroup.Item key={ship.properties.name} className="fleet-card-list-group-item">
                      <span className="fleet-card-ship-name">{ship.properties.name}</span> 
                      {' - '} 
                      <span className="fleet-card-quantity">{ship.quantity}</span>
                    </ListGroup.Item>
              ))}
              </ListGroup>
              )}
              {starfighters.length > 0 &&(
                  <ListGroup variant="flush">
                    <h4 className="fleet-card-heading">Starfighters</h4>
                    {starfighters.map((ship) => (
                        <ListGroup.Item key={ship.properties.name} className="fleet-card-list-group-item">
                          <span className="fleet-card-ship-name">{ship.properties.name}</span> 
                          {' - '} 
                          <span className="fleet-card-quantity">{ship.quantity}</span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
              )}
              {bombers.length > 0 &&(
              <ListGroup variant="flush">
                <h4 className="fleet-card-heading">Bombers</h4>
                {bombers.map((ship) => (
                    <ListGroup.Item key={ship.properties.name} className="fleet-card-list-group-item">
                      <span className="fleet-card-ship-name">{ship.properties.name}</span> 
                      {' - '} 
                      <span className="fleet-card-quantity">{ship.quantity}</span>
                    </ListGroup.Item>
              ))}
              </ListGroup>
              )}
              </Card.Body>
            </Card>
  )
}

export default FleetCard