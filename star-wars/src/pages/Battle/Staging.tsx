import React, { useState, useEffect } from 'react'
import { FavoriteShip, nonUserShip } from '../../interfaces/Ship';
import {Container, Row, Col, Card, Button, Tab, Tabs} from 'react-bootstrap'
import FleetCard from '../../components/FleetCard';
import axios from 'axios';
import '../../components/FleetCard.css'
import './TabStaging.css'
import { Lock } from 'lucide-react';
import { useAuth } from '../../contexts/authContext';

const Staging = ({userShips, enemyShips, setEnemyShips, setReady}: {userShips:nonUserShip[] | FavoriteShip[], enemyShips:nonUserShip[], setEnemyShips:any, setReady:any}) => {
    const [selectedEnemy, setSelectedEnemy] = useState(false);
    const [level, setLevel] = useState(1)
    const [activeTab, setActiveTab] = useState(undefined)
    const {userLoggedIn} = useAuth()
    useEffect(()=>{
        async function handleLevelClick(){
            const response = await axios.get(`https://starwars-backend-z23b.onrender.com/enemyfleet?level=${level}`)
            setEnemyShips(response.data.ships)
            setSelectedEnemy(true)
            console.log(response.data)
        }
        handleLevelClick()
    })
   


    const handleTabSelect = (eventKey: any) => {
        const level = parseInt(eventKey);
        setActiveTab(eventKey)
        if (!isNaN(level)) {
            setLevel(level)
        }
    };
    
    return (
        <div>
            <div>
            <h3 className='main-heading'>Select An Enemy Fleet To Fight</h3>
           
            <Row className="justify-content-center my-4">
                <Col xs={12} md={6} lg={4}>
                    <Tabs
                        activeKey={activeTab}// Default to the first level
                        id="enemy-fleet-tabs"
                        className="mb-3 custom-tabs"
                        justify
                        onSelect={handleTabSelect}
                    >
                        <Tab  eventKey="1" title={<span>Pirates</span>}></Tab>
                        <Tab disabled={!userLoggedIn} eventKey="2" title={userLoggedIn ? <span>Rebellion</span> :<span>Rebellion <Lock/></span> }> </Tab>
                        <Tab disabled={!userLoggedIn} eventKey="3"title={ userLoggedIn ? <span>Republic</span> :<span>Republic <Lock/></span>} ></Tab>
                        <Tab disabled={!userLoggedIn} eventKey="4" title={ userLoggedIn ? <span>Empire</span> :<span>Empire <Lock/></span>} ></Tab>
                    </Tabs>
                </Col>
            </Row>
            </div>
            <Container>   
                <Row className="justify-content-center align-items-start my-5">
                    <Col xs={12} md={6} className="mb-4 mb-md-0">
                        <div className="d-flex flex-column align-items-center">
                            <h2 className='main-heading'>Your Fleet</h2>
                            <FleetCard ships={userShips}/>
                        </div>
                    </Col>
                    <Col xs={12} md={6} className="mb-4 mb-md-0">
                        <div className="d-flex flex-column align-items-center">
                            <h2 className='main-heading'>Enemy Fleet</h2>
                            {selectedEnemy ? (
                                <FleetCard ships={enemyShips}/>
                            ): (
                                <Card style={{ minHeight: '8rem', maxWidth:'26rem' }} className="fleet-card-container d-flex flex-column justify-content-center align-items-center p-3 rounded">
                                    <p className="fw-bold mb-2 text-center text-white">Loading enemy fleet...</p>
                                </Card>
                            )}
                        </div>
                    </Col>
                </Row>
                <Button onClick={()=>setReady(true)}>Enter Battle</Button>
            </Container>
        </div>
    )
}

export default Staging