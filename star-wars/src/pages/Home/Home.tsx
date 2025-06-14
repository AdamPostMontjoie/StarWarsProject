import React from 'react'
import TopNav from '../../components/TopNav'
import CharSearch from './CharSearch'
import ShipSearch from './ShipSearch'
import { useState } from 'react'
import { Button } from 'react-bootstrap'

const Home = () => {
  const [chars,setChars] = useState(true)
  return (
    <div>
      <TopNav/>
        {chars ? <Button onClick={()=>setChars(false)}>Search for ships!</Button> : <Button onClick={()=>setChars(true)}>Search for characters!</Button>}
        { chars && <CharSearch/>}
        {!chars && <ShipSearch/>}

    </div>
  )
}

export default Home