import React, { useState,useEffect } from 'react'
import TopNav from '../../components/TopNav'
import axios from 'axios'
import { Container,Row, Col, } from 'react-bootstrap'
import { Ship } from '../../interfaces/Ship'
import ShipCard from './ShipCard'
import { useAuth } from '../../contexts/authContext'

const Starships = () => {
  const [favShips, setFavShips] = useState<Ship[]>([])
  const {currentUser, userLoggedIn} = useAuth()
  
  const handleShipDeleted = (deletedShipId: string) => {
    setFavShips(prevShips => prevShips.filter(ship => ship._id !== deletedShipId));
  };
  useEffect(()=>{  
    async function loadShips(){
      if(userLoggedIn){
        try{
          let ships = await axios.get(`http://localhost:5050/starships?uid=${currentUser.uid}`)
          setFavShips(ships.data)
        }
        catch(error){
          console.log(error);
        }
      } 
    }
    loadShips()
  },[userLoggedIn, currentUser])

  return (
    <Container>
        <TopNav/>
        <h1>Favorite Ships</h1>
        {favShips && userLoggedIn && favShips.length > 0 && (
          <Row className="mt-4">
          {favShips.map((data:Ship) => (
              <Col key={data.uid} xs={12} sm={6} md={4} lg={3} className="mb-3">
                  <ShipCard ship={data} onDelete={handleShipDeleted}/>
              </Col>
          )) }
      </Row>
        )}
        {favShips.length === 0 && (<h2>Add some starships to your favorites!</h2>)}
    </Container>
  )
}

export default Starships