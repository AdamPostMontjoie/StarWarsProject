import React, { useEffect, useState } from 'react';
import TopNav from '../../components/TopNav';
import { Container, Row,Col, Button, Dropdown} from 'react-bootstrap';
import axios from 'axios';
import FleetCard from './FleetCard';
import { useAuth } from '../../contexts/authContext';
import { startBattle } from './BattleLogic';
import NotLoggedIn from '../../components/NotLoggedIn';
import { User } from '../../interfaces/User';
import { FavoriteShip, nonUserShip } from '../../interfaces/Ship';
import BattleReport from './BattleReport';

const Battle = ({userShips, setUserShips} : {userShips:nonUserShip[] | FavoriteShip[], setUserShips:any}) => {
    const [enemyShips,setEnemyShips] = useState<nonUserShip[]>([])
    const [selectedEnemy,setSelectedEnemy] = useState(false)
    const [battleReport, setBattleReport] = useState("")
    const [loadingBattle,setLoadingBattle] = useState(false)
    const [winner, setWinner] = useState("")
    const {currentUser, userLoggedIn, loading} = useAuth()

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
            setSelectedEnemy(false)
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
        <TopNav/>
        <Container className='text-center'>
            <h1>Star Wars Fleet Battle</h1>
            <h3>Select a fleet to fight</h3>
            <Row className="justify-content-center my-4">
                <Col xs={12} md={6} lg={4}>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>handleLevelClick(1)} >Pirates</Dropdown.Item>
                            <Dropdown.Item onClick={()=>handleLevelClick(2)}>Rebellion</Dropdown.Item>
                            <Dropdown.Item onClick={()=>handleLevelClick(3)}>Republic</Dropdown.Item>
                            <Dropdown.Item onClick={()=>handleLevelClick(4)}>Empire</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            {selectedEnemy && userShips && (
                <Container>
                    <Row className="justify-content-center align-items-start my-5">
                        <Col xs={12} md={6} lg={5} className="mb-4 mb-md-0">
                            <h2>Your Fleet</h2>
                            <FleetCard ships={userShips}/>
                        </Col>
                        <Col xs={12} md={6} lg={5} className="mb-4 mb-md-0">
                            <h2>Enemy fleet (mirror of user for now)</h2>
                            <FleetCard ships={enemyShips}/>
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
            {battleReport && !selectedEnemy && (
                <div className="my-3">
                    <BattleReport winner={winner} text={battleReport}/>
                </div>
            )}
        </Container>
        </div>
    )
}

export default Battle