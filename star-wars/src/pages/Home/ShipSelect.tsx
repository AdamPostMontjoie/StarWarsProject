import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Container, Col, Row } from 'react-bootstrap'
import ShipCard from './ShipCard'
import { response } from 'express'
import { FavoriteShip, nonUserShip } from '../../interfaces/Ship'

const ShipSelect = ({addToFleet, userShips} :{addToFleet:any, userShips:nonUserShip[] | FavoriteShip[]}) => {
    const [ships,setShips] = useState<any[]>([])
    async function getShips(){
        const response = await axios.get("http://localhost:5050/availableships")
        setShips(response.data)
    }
    useEffect(()=>{
        getShips()
    },[])

  return (
    <div>
        <h1>Pick your ships</h1>
        {ships.length > 0 && (
            <Container>
                <Row className="mt-5 gx-1 gy-1 align-items-stretch">
                {ships.map((ship: nonUserShip, index: number) => (
                    
                    <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
                        <ShipCard key={index} userShips={userShips} addToFleet={addToFleet} ship={ship} />
                    </Col>    
                ))}
                </Row>
            </Container>
        )}
        
    </div>
  )
}

export default ShipSelect