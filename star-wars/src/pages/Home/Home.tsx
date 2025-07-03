import React from 'react'
import TopNav from '../../components/TopNav'
import { useAuth } from '../../contexts/authContext'
import NotLoggedIn from '../../components/NotLoggedIn'
import { useState } from 'react'
import Battle from '../Battle/Battle'
import { Button } from 'react-bootstrap'
import { FavoriteShip, nonUserShip } from '../../interfaces/Ship'
import ShipSelect from './ShipSelect'
//this page is real barebones because originally was Character search as well
//biggest problem i have with my react code in this was not making more components, too much per page

const Home = () => {
  const [ready, setReady] = useState(false)
  const [shipSelector,setShipSelector] = useState(false)
  const [guestShips, setGuestShips] = useState<nonUserShip[]>([])
  function handleReady(){
    setReady(!ready)
  }
  function toggleShipSelector(){
    setShipSelector(!shipSelector)
  }
  function addToFleet(ship:nonUserShip){
    console.log("clicked");
    setGuestShips(prevGuestShips => {
        const existingShipIndex = prevGuestShips.findIndex(
            e => e.properties.name === ship.properties.name
        );
        if (existingShipIndex > -1) {
            const existingShip = prevGuestShips[existingShipIndex];
            if (existingShip.quantity !== ship.quantity) {
                const updatedShips = [...prevGuestShips];
                updatedShips[existingShipIndex] = {
                    ...existingShip,
                    quantity: ship.quantity
                };
                return updatedShips;
            } else {
                return prevGuestShips;
            }
        } else {
            return [...prevGuestShips, ship];
        }
    });
    console.log(guestShips)
  }

  return (
    <div>
      <TopNav/>
      <div className="pt-5">
      <Button onClick={toggleShipSelector}>Add to Fleet</Button>
      { shipSelector && <ShipSelect addToFleet={addToFleet}/>}
      <Button onClick={handleReady}>Ready for Battle</Button>
      {ready && <Battle/>}
      </div>
      
    </div>
  )
}

export default Home