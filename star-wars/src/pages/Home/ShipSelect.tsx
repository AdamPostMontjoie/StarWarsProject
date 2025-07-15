import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {  Container, Col, Row, Accordion } from 'react-bootstrap'
import ShipCard from './ShipCard'
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
                            <Row className="mt-5 gx-1 gy-1 align-items-stretch row-cols-2 row-cols-md-4 row-cols-lg-6 row-cols-xl-8">
                            {ships.map((ship: nonUserShip, index: number) => (
                                <Col key={index} className="mb-3">
                                    <ShipCard index={index} key={index} userShips={userShips} addToFleet={addToFleet} ship={ship} />
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