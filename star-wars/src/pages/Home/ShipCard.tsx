import React, {useState} from 'react'
import { Card, Container,ListGroup, Button,Spinner} from 'react-bootstrap'
import axios from 'axios'
import { FavoriteShip, nonUserShip, Ship } from '../../interfaces/Ship'
import ShipQuantity from './ShipQuantity'
import { useAuth } from '../../contexts/authContext'
import { useEffect } from 'react'
import ShipImageArray from './shipImages'

const ShipCard = ({index, ship, addToFleet, userShips} : {index:number, ship:any, addToFleet:any, userShips:FavoriteShip[] | nonUserShip[]}) => {

  const [quantity, setQuantity] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const shipInUserFleet = userShips.find(
    (fleetShip) => fleetShip.properties.name === ship.name
  );
  useEffect(() => {
    if (userShips && userShips.length > 0) {
      if (shipInUserFleet) {
        setQuantity(shipInUserFleet.quantity);
      } else {
        setQuantity(0);
      }
    } else {
      setQuantity(0);
    }
  }, [userShips, ship, shipInUserFleet]);

  async function postShip() {
    if (quantity > 0 || shipInUserFleet) {
      setIsAdding(true); 

      const shipWithQuantity = {
        quantity: quantity,
        description: "A starship",
        __v: 0,
        id: '68582347e7ad29e14ff4d1dd',
        properties: ship
      };

      const operationPromise = (async () => {
        await addToFleet(shipWithQuantity);
      })();

      const minDisplayDelay = new Promise(resolve => setTimeout(resolve, 500)); 

      try {
        await Promise.all([operationPromise, minDisplayDelay]); 
      } catch (error) {
        console.error("Error adding ship to fleet:", error);
      } finally {
        setIsAdding(false);
      }
    }
  }
  const imageUrl = ShipImageArray[index]

  return (
        <Card className="w-100 h-100" style={{ minHeight: '220px' }}>
      <Card.Img 
        variant="top" 
        src={ imageUrl || 'https://via.placeholder.com/150x100?text=No+Image'} 
        style={{ height: '120px', objectFit: 'cover', background: '#e0e0e0' }} 
      />
      <Card.Body className="text-center d-flex flex-column flex-grow-1 justify-content-between p-2">
        <Card.Title className="fs-6 mb-1">{ship.model}</Card.Title>     
        <ShipQuantity setCount={setQuantity} count={quantity}/>
      </Card.Body>
      <Button
        onClick={postShip}
        className="w-100 py-1"
        disabled={isAdding}
      >
        {isAdding ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="ms-2">Adding...</span> 
          </>
        ) : (
          'Add to Fleet'
        )}
      </Button>
    </Card>
  )
}

export default ShipCard