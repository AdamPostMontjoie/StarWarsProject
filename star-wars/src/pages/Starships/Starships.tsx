import React, { useState,useEffect } from 'react'
import TopNav from '../../components/TopNav'
import axios from 'axios'
import { Container,Row, Col, } from 'react-bootstrap'
import { FavoriteShip } from '../../interfaces/Ship'
import ShipCard from './ShipCard'
import { useAuth } from '../../contexts/authContext'
import NotLoggedIn from '../../components/NotLoggedIn'

const Starships = () => {
  const [userShips, setUserShips] = useState<FavoriteShip[]>([])
  const {currentUser, userLoggedIn, loading} = useAuth()
  async function handleShipDeleted(shipToDelete: string) {
    if (!currentUser || !currentUser.uid) {
      console.error("User not logged in or UID not available.");
      return;
    }

    try {
       await axios.delete(
        `http://localhost:5050/users/${currentUser.uid}/ships`,
        { 
          data: { ship: shipToDelete }
        }
      );
      setUserShips(prevShips => {
        const indexToDelete = prevShips.findIndex(ship => ship.properties.name === shipToDelete);
        if (indexToDelete > -1) {
          const newShips = [...prevShips];
          newShips.splice(indexToDelete, 1);
          return newShips;
        }
        return prevShips;
      });
    } catch (error) {
      console.error('Error deleting ship:', error);
    }
  };

  useEffect(()=>{
    async function getLoggedInShips(){
      if(userLoggedIn){
        try{
          let response = await axios.get(`http://localhost:5050/users/${currentUser.uid}`)
          setUserShips(response.data.ships)
          console.log("got logged in ships", response.data.ships)
        } catch(err){
          console.error(err)
          setUserShips([])
        }
      }
    }
    getLoggedInShips()
  },[currentUser,userLoggedIn])

  return (
    <div>
      <TopNav/>
      {userLoggedIn || loading ? 
      <div>
      <Container className='text-center'>
      <h1 className='mt-5'>Favorite Ships</h1>
      {userShips && userLoggedIn && userShips.length > 0 && (
        <Row className="mt-4">
        {userShips.map((data:FavoriteShip) => (
            <Col key={data._id} xs={12} sm={6} md={4} lg={3} className="mb-3">
                <ShipCard  ship={data} onDelete={handleShipDeleted}/>
            </Col>
        )) }
    </Row>
      )}
      {userShips.length === 0 && (<h2>Add some starships to your favorites!</h2>)}
      </Container>
    </div>
     : <div>
        <NotLoggedIn/>
     </div> }
      
    </div>
    
  )
}

export default Starships