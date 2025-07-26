import React, {useRef} from 'react'
import TopNav from '../../components/TopNav'
import { useAuth } from '../../contexts/authContext'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Battle from '../Battle/Battle'
import { Button} from 'react-bootstrap'
import { FavoriteShip, nonUserShip } from '../../interfaces/Ship'
import ShipSelect from './ShipSelect'
import InfoModal from '../../components/InfoModal'
import FleetCard from '../Battle/FleetCard'

const Home = () => {
  const {userLoggedIn, currentUser, loading} = useAuth()
  
  const [shipSelector,setShipSelector] = useState(true)
  const [userShips, setUserShips] = useState<nonUserShip[] | FavoriteShip[]>([])
  const [userCredits, setUserCredits] = useState(1000) //default value for now
  const initialShipsLoaded = useRef(false);
  const [ready, setReady] = useState(false);

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
  //
  
  useEffect(()=>{
    async function getLoggedInShips(){
      if (loading) {
        return;
      }
      if (!userLoggedIn) {
        setUserShips([]); 
        initialShipsLoaded.current = false;
        return;
      }
      if (currentUser?.uid) {
        try{
          let response = await axios.get(`https://starwars-backend-z23b.onrender.com/users/${currentUser.uid}`);
          const fetchedShips = response.data.ships || [];
          setUserShips(fetchedShips);
          initialShipsLoaded.current = true;
          console.log("Got logged in ships:", fetchedShips);
        } catch(err){
          console.error("Error fetching logged in ships:", err);
          setUserShips([]); 
          initialShipsLoaded.current = true;
        }
      } else {
        console.log("User logged in, but currentUser.uid not yet available. Waiting to fetch ships.");
      }
    }
    getLoggedInShips();
  },[currentUser,userLoggedIn, loading]);
  useEffect(() => {
    async function saveUserShips(shipsToSave:FavoriteShip[] | nonUserShip[]) {
      if (!currentUser || !currentUser.uid) {
        console.warn("User not logged in or UID not available. Skipping ship save.");
        return;
      }
    
      try {
        const response = await axios.put(
          `https://starwars-backend-z23b.onrender.com/users/${currentUser.uid}/ships`,
          { 
            ships: shipsToSave 
          }
        );
        console.log('Ships saved successfully:', response.data);
      } catch (error) {
        console.error('Error saving ships:', error);
      }
    }
    if (userLoggedIn && currentUser?.uid && initialShipsLoaded.current) {
      console.log("Auto-saving user ships to DB...", userShips);
      saveUserShips(userShips); 
    } else if (userLoggedIn && currentUser?.uid && !initialShipsLoaded.current) {
      console.log("Auto-save skipped: Ships not yet initially loaded from DB after login.");
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
      {!userLoggedIn && !loading && (
        <InfoModal/>
      )}
        <ShipSelect ready={ready} userShips={userShips} addToFleet={addToFleet}/>
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