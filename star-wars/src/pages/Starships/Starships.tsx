import React, { useState,useEffect } from 'react'
import TopNav from '../../components/TopNav'
import axios from 'axios'
import { Container,Row, Col, } from 'react-bootstrap'
import { FavoriteShip } from '../../interfaces/Ship'
import ShipCard from './ShipCard'
import { useAuth } from '../../contexts/authContext'
import NotLoggedIn from '../../components/NotLoggedIn'

const Starships = () => {
  const [favShips, setFavShips] = useState<FavoriteShip[]>([])
  const {currentUser, userLoggedIn, loading} = useAuth()
  
  const handleShipDeleted = (deletedShipId: string) => {
    setFavShips(prevShips => prevShips.filter(ship => ship._id !== deletedShipId));
  };
  useEffect(()=>{  
    async function loadShips(){
      if(userLoggedIn){
        try{
          let response = await axios.get(`https://starwars-backend-z23b.onrender.com/starships?uid=${currentUser.uid}`)
          setFavShips(response.data)
        }
        catch(error){
          console.log(error);
        }
      } 
    }
    loadShips()
  },[userLoggedIn, currentUser])

  return (
    <div>
      <TopNav/>
      <div>
        
        <Container className='text-center'>
        <h1>Favorite Ships</h1>
        <h6 className='text-muted'>To change quantity, search ship again on home page</h6>
        {favShips && userLoggedIn && favShips.length > 0 && (
          <Row className="mt-4">
          {favShips.map((data:FavoriteShip) => (
              <Col key={data._id} xs={12} sm={6} md={4} lg={3} className="mb-3">
                  <ShipCard  ship={data} onDelete={handleShipDeleted}/>
              </Col>
          )) }
      </Row>
        )}
        {favShips.length === 0 && (<h2>Add some starships to your favorites!</h2>)}
        </Container>
      </div>
    </div>
    
  )
}

export default Starships