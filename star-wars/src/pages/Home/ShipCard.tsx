import React, {useState} from 'react'
import { Card, Container,ListGroup, Button } from 'react-bootstrap'
import axios from 'axios'
import { Ship } from '../../interfaces/Ship'
import ShipQuantity from './ShipQuantity'
import { useAuth } from '../../contexts/authContext'

const ShipCard = ({ship, addToFleet} : {ship:any, addToFleet:any}) => {
  const {currentUser,userLoggedIn} = useAuth()
  let [quantity, setQuantity] = useState(1);
  

  async function postShip(){
    const shipWithQuantity = {
      quantity:quantity,
      description: "A starship",
      __v:0,
      id: '68582347e7ad29e14ff4d1dd',
      properties:ship
    }
     addToFleet(shipWithQuantity)
  }

 
  return (
    <Container>
        <Card style={{ width: '18rem', minHeight: '18rem' }}>
      <Card.Img 
        variant="top" 
        src={ship.imageUrl || 'https://via.placeholder.com/150x100?text=No+Image'} 
        style={{ height: '120px', objectFit: 'cover', background: '#e0e0e0' }} 
      />
      <Card.Body className="text-center">
        <Card.Title >{ship.model}</Card.Title>     
        <ShipQuantity setCount={setQuantity} count={quantity}/>
      </Card.Body>
      <Button onClick={postShip} className="w-100">Add to Favorites</Button>
    </Card>
    </Container>
  )
}

export default ShipCard