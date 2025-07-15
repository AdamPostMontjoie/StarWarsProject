import React, { useEffect, useState } from 'react';
import { Container, Row,Col, Button, Dropdown, Card} from 'react-bootstrap';
import axios from 'axios';
import FleetCard from './FleetCard';
import { useAuth } from '../../contexts/authContext';
import { startBattle } from './BattleLogic';
import { FavoriteShip, nonUserShip } from '../../interfaces/Ship';
import BattleReport from './BattleReport';

const Battle = ({userShips, setUserShips, resetGame} : {userShips:nonUserShip[] | FavoriteShip[], setUserShips:any, resetGame:any}) => {
    const [enemyShips,setEnemyShips] = useState<nonUserShip[]>([])
    const [selectedEnemy,setSelectedEnemy] = useState(false)
    const [battleReport, setBattleReport] = useState("")
    const [loadingBattle,setLoadingBattle] = useState(false)
    const [winner, setWinner] = useState("")
    const {currentUser, userLoggedIn} = useAuth()

    async function handleLevelClick(level:number){
        try{
            
            let response = await axios.get(`http://localhost:5050/enemyfleet/?level=${level}`)
            setSelectedEnemy(true)
            console.log("enemy level 1", response.data)
            setEnemyShips(response.data.ships)
        }
        catch(err){
            console.error("couldn't get enemy fleet", err)
        }
    }

    async function handleBattleClick(){
        if(userShips && enemyShips){
            setLoadingBattle(true)
            setBattleReport("")
            try{
                const data = await startBattle(userShips,enemyShips)
                setBattleReport(data.response.result)
                if(data.winner === "User"){
                    setWinner("You Won!")
                } else{
                    setWinner("You Lost")
                }
            } catch(err){
                console.error(err)
            } finally{
                setLoadingBattle(false)
            }
            
        } 
    }

    function handleReset(){
        setBattleReport("")
        setSelectedEnemy(false)
        resetGame()
    }

    useEffect(()=>{
        async function getUserData(){
            if(userLoggedIn){
                try{
                    let response = await axios.get(`http://localhost:5050/users/${currentUser.uid}`)
                    console.log(response.data)
                    response = await axios.get(`http://localhost:5050/starships/?uid=${currentUser.uid}`)
                    if(response.data.length > 0){
                        setUserShips(response.data)
                    }
                    else{
                        console.log("idk");
                        
                    }
                }   
                catch(err){
                    console.error(err)
                }
            }
        }
        getUserData()
    },[currentUser,userLoggedIn, setUserShips])


    return (
        <div>
        <Container className='text-center'>
        {!loadingBattle && !battleReport && (
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
                            {userLoggedIn ? (
                                <div>
                                    <Dropdown.Item onClick={()=>handleLevelClick(2)}>Level 2 - Rebellion</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>handleLevelClick(3)}>Level 3 - Republic</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>handleLevelClick(4)}>Level 4 - Empire</Dropdown.Item>
                                </div>
                            ) :
                                <div>
                                    <Dropdown.Item>Log In To Play Next</Dropdown.Item>
                                </div>
                            }
                            
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            </div>
        )}
            {!loadingBattle && userShips && !battleReport && (
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
                    <Button onClick={()=>handleBattleClick()} size='lg'>Battle!</Button>
                </Container>
            )}
            {loadingBattle && (
                <div className="my-3">
                    Analyzing battle... Awaiting transmission from the AI.
                </div>
            )}
            {battleReport  && (
                <div className="my-3">
                    <BattleReport loggedIn={userLoggedIn} reset={handleReset} winner={winner} text={battleReport}/>
                </div>
            )}
        </Container>
        </div>
    )
}

export default Battle