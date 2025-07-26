import React, { useEffect, useState } from 'react'
import { FavoriteShip, nonUserShip } from '../../interfaces/Ship';
import {Container, Row, Col, Card, Button, Dropdown} from 'react-bootstrap'
import FleetCard from './FleetCard';
import axios from 'axios';

const Staging = ({userShips, enemyShips, setEnemyShips}: {userShips:nonUserShip[] | FavoriteShip[], enemyShips:nonUserShip[], setEnemyShips:any,}) => {
    const [selectedEnemy, setSelectedEnemy] = useState(false);
    
    async function handleLevelClick(level:number){
        const response = await axios.get(`https://starwars-backend-z23b.onrender.com/enemyfleet?level=${level}`)
        setEnemyShips(response.data.ships)
        setSelectedEnemy(true)
        console.log(response.data)
    }

    return (
        <div>
            <div>
            <h3>Select An Enemy Fleet To Fight</h3>
            <Row className="justify-content-center my-4">
                <Col xs={12} md={6} lg={4}>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Enemy Fleets
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='text-center'>
                            <Dropdown.Item onClick={()=>handleLevelClick(1)} >Level 1 - Pirates</Dropdown.Item>

                                <div>
                                    <Dropdown.Item onClick={()=>handleLevelClick(2)}>Level 2 - Rebellion</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>handleLevelClick(3)}>Level 3 - Republic</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>handleLevelClick(4)}>Level 4 - Empire</Dropdown.Item>
                                </div>
                                <div>
                                    <Dropdown.Item>Log In To Play Next</Dropdown.Item>
                                </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            </div>
            <Container>
                <Row className="justify-content-center align-items-start my-5">
                    <Col xs={12} md={6} lg={5} className="mb-4 mb-md-0">
                        <h2>Your Fleet</h2>
                        <FleetCard ships={userShips}/>
                    </Col>
                    <Col xs={12} md={6} lg={5} className="mb-4 mb-md-0">
                        <h2>Enemy fleet</h2>
                        {selectedEnemy ? (
                            <FleetCard ships={enemyShips}/>
                        ): (
                            <Container className='d-flex justify-content-center'>
                            <Card style={{ width: '18rem', minHeight: '150px' }} className="border border-info rounded bg-light text-info d-flex flex-column justify-content-center align-items-center p-3">
                                <p className="fw-bold mb-2 text-center">No Enemy Fleet Selected</p>
                                <p className="text-muted text-center mb-0 small">Please choose a fleet level from the dropdown to challenge.</p>
                            </Card>
                        </Container>
                        )}
                        
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Staging