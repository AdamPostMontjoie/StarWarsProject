import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Container, Col, Row, Accordion } from 'react-bootstrap'
import ShipCard from './ShipCard'
import { response } from 'express'
import { FavoriteShip, nonUserShip } from '../../interfaces/Ship'

const ShipSelect = ({addToFleet, userShips} :{addToFleet:any, userShips:nonUserShip[] | FavoriteShip[]}) => {
    const [ships,setShips] = useState<any[]>([])
    const [activeAccordionKey, setActiveAccordionKey] = useState(userShips.length < 1 ? '0' : null);

    async function getShips(){
        const response = await axios.get("http://localhost:5050/availableships")
        setShips(response.data)
    }

    function toggleAccordion(){
        if(activeAccordionKey === '0') setActiveAccordionKey(null)
        else setActiveAccordionKey('0')
    }

    useEffect(()=>{
        getShips()
    },[])

  return (
    <div>
        <Accordion activeKey={activeAccordionKey} >
            <Accordion.Item eventKey="0">
                <Accordion.Header onClick={toggleAccordion}>
                <div className='d-flex justify-content-center w-100'>
                        <h1>Pick your ships</h1>
                    </div>
                    </Accordion.Header>
                <Accordion.Body>
                    {ships.length > 0 ? (
                        <Container>
                            <Row className="mt-5 gx-1 gy-1 align-items-stretch">
                            {ships.map((ship: nonUserShip, index: number) => (
                                <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
                                    <ShipCard key={index} userShips={userShips} addToFleet={addToFleet} ship={ship} />
                                </Col>    
                            ))}
                            </Row>
                        </Container>
                    ) : (
                        <p>Loading ships or no ships available...</p>
                    )}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </div>
  )
}

export default ShipSelect