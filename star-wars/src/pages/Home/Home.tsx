import React from 'react'
import TopNav from '../../components/TopNav'
import { useAuth } from '../../contexts/authContext'
import NotLoggedIn from '../../components/NotLoggedIn'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Battle from '../Battle/Battle'
import { Button, Container } from 'react-bootstrap'
import { FavoriteShip, nonUserShip } from '../../interfaces/Ship'
import ShipSelect from './ShipSelect'
import InfoModal from '../../components/InfoModal'
import FleetCard from '../Battle/FleetCard'

const Home = () => {
  const {userLoggedIn, currentUser} = useAuth()
  const [ready, setReady] = useState(false)
  const [shipSelector,setShipSelector] = useState(true)
  const [userShips, setUserShips] = useState<nonUserShip[] | FavoriteShip[]>([])
  function handleReady(){
    if(userShips.length > 0){
    setReady(!ready)
    setShipSelector(!shipSelector)
    } else{
      alert("add ships before you can play")
    }
  }
  function resetGame(){
    setReady(false)
  }
  //https://starwars-backend-z23b.onrender.com
  
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
  useEffect(() => {
    async function saveUserShips(shipsToSave:FavoriteShip[] | nonUserShip[]) {
      if (!currentUser || !currentUser.uid) {
        console.error("User not logged in or UID not available.");
        return;
      }
    
      try {
        const response = await axios.put(
          `http://localhost:5050/users/${currentUser.uid}/ships`,
          { 
            ships: shipsToSave 
          }
        );
        console.log('Ships saved successfully:', response.data);
      } catch (error) {
        console.error('Error saving ships:', error);
      }
    }
    if (userLoggedIn && currentUser?.uid) {
      console.log("Auto-saving user ships to DB...", userShips);
      saveUserShips(userShips); 
    }
  }, [userShips, userLoggedIn, currentUser]);
  // if user is logged in, add to fleet will add to their db
  function addToFleet(ship:nonUserShip) {
    setUserShips(prevuserShips => {
      const existingShipIndex = prevuserShips.findIndex(
          e => e.properties.name === ship.properties.name
      );
// if ship quantity is 0, but already exists in db, it is removed
      if (ship.quantity === 0) {
        if (existingShipIndex > -1) {
          return prevuserShips.filter((_, index) => index !== existingShipIndex);
        } else {
          return prevuserShips;
        }
      } else {
        if (existingShipIndex > -1) {
          const updatedShips = [...prevuserShips];
          updatedShips[existingShipIndex] = {
              ...prevuserShips[existingShipIndex],
              quantity: ship.quantity
          };
          return updatedShips;
        } else {
          return [...prevuserShips, ship];
        }
      }
    });
  }
  
  

  return (
    <div className='text-center'>
      <TopNav/>
      
      <div className="pt-5">
      <InfoModal loggedIn={userLoggedIn}/>
      {!ready && (
        <ShipSelect userShips={userShips} addToFleet={addToFleet}/>
      )} 
      {!ready && userShips.length > 0 && (
        <div className='mt-5'>
          <h2>Your Fleet</h2>
          <FleetCard ships={userShips}/>
          <Button className='mt-5'onClick={handleReady}>Ready for Battle</Button>
        </div>
      )} 
      {ready && userShips.length > 0  && (
        <div className='mt-5'>
          <Battle  resetGame={resetGame} userShips={userShips} setUserShips={setUserShips}/>
        </div>
        
      )
      }
      {!ready && userShips.length < 1 && (
        <h3 className='mt-5'>Add Ships To Play</h3>
      )}
      </div>
      
    </div>
  )
}

export default Home