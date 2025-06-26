import React, {useState} from 'react'
import { Card, Container,ListGroup, Button } from 'react-bootstrap'
import axios from 'axios'
import { Ship } from '../../interfaces/Ship'
import ShipQuantity from './ShipQuantity'
import { useAuth } from '../../contexts/authContext'

const ShipCard = ({ship} : {ship:Ship}) => {
  const {currentUser,userLoggedIn} = useAuth()
  let [quantity, setQuantity] = useState(1);
  

  async function postShip(){
    if(userLoggedIn){
      const userShip = {
        uid: currentUser.uid,
        properties:ship.properties,
        quantity:quantity
      }
      try{
        const backendResponse = await axios.post("http://localhost:5050/starships", userShip)
        console.log(backendResponse);     
      }
      catch(error){
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 409) {
            alert("You already favorited this ship! Update quantity on My Starships page");
            console.warn("Duplicate starship:", error.response.data.message);
          } else {
            alert(`Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
            console.error("Backend error:", error.response.status, error.response.data);
          }
      }
    }
    }
    else{
      alert("You need to be logged in to add to favorites")
    }
  }
  return (
    <Container>
        <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{ship.properties.name}</Card.Title>     
        <Card.Subtitle>{ship.properties.model}</Card.Subtitle>   
        <ListGroup variant="flush">
        <ListGroup.Item>Class: {ship.properties.starship_class}</ListGroup.Item>
        <ListGroup.Item>Crew: {ship.properties.crew}</ListGroup.Item>
        <ListGroup.Item>Speed: {ship.properties.max_atmosphering_speed}</ListGroup.Item>
      </ListGroup>
      <ShipQuantity setCount={setQuantity} count={quantity}/>
      </Card.Body>
      <Button onClick={postShip}>Add to Favorites</Button>
    </Card>
    </Container>
  )
}

export default ShipCard