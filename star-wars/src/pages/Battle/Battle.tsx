import React, { useEffect, useState } from 'react';
import TopNav from '../../components/TopNav';
import { Container, Row,Col, Button} from 'react-bootstrap';
import axios from 'axios';
import FriendsList from '../../components/FriendsList';
import FleetCard from './FleetCard';
import { useAuth } from '../../contexts/authContext';
import { startBattle } from './BattleLogic';
import NotLoggedIn from '../../components/NotLoggedIn';
import { User } from '../../interfaces/User';
import { FavoriteShip } from '../../interfaces/Ship';
import BattleReport from './BattleReport';

const Battle = () => {
    const [dbUser,setDbUser] = useState<User>()
    const [userShips,setUserShips] = useState<FavoriteShip[] | null>(null)
    const [friendShips,setFriendShips] = useState<FavoriteShip[] | null>(null)
    const [selectedFriend,setSelectedFriend] = useState(false)
    const [battleReport, setBattleReport] = useState("")
    const [loadingBattle,setLoadingBattle] = useState(false)
    const [winner, setWinner] = useState("")
    const {currentUser, userLoggedIn, loading} = useAuth()
    // will wait for battlelogic function to return, build in delay if too quick
    //users should have to wait at least 3 seconds
    //const [battleLoading, setBattleLoading] = useState(false)

    async function handleFriendClick(friendUid:string){
        try{
            console.log("battle friend function called")
            let response = await axios.get(`https://starwars-backend-z23b.onrender.com/starships/?uid=${friendUid}`)
            if(response.data.length > 0){
                setFriendShips(response.data)
                setSelectedFriend(true)
            }
            else{
                alert("this friend has no ships, please choose another")
            }
        }
        catch(err){
            console.error(err)
        }
    }

    async function handleBattleClick(){
        if(userShips && friendShips){
            setLoadingBattle(true)
            setSelectedFriend(false)
            setBattleReport("")
            try{
                const data = await startBattle(userShips,friendShips)
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
                    let response = await axios.get(`https://starwars-backend-z23b.onrender.com/users/${currentUser.uid}`)
                    console.log(response.data)
                    setDbUser(response.data)
                    response = await axios.get(`https://starwars-backend-z23b.onrender.com/starships/?uid=${currentUser.uid}`)
                    if(response.data.length > 0){
                        setUserShips(response.data)
                    }
                    else{
                        alert("Please add ships to play this mode")
                    }
                }   
                catch(err){
                    console.error(err)
                }
            }
        }
        getUserData()
    },[currentUser,userLoggedIn])
    return (
        <div>
        <TopNav/>
        <Container className='text-center'>
            <h1>Star Wars Fleet Battle</h1>
            <h3>Choose one of your friends to attack</h3>
            <Row className="justify-content-center my-4">
                <Col xs={12} md={6} lg={4}>
                    {userLoggedIn && currentUser && dbUser && userShips && (
                        <FriendsList handleClick={handleFriendClick} friends={dbUser.friends || []}/>
                    )}
                </Col>
            </Row>
            {selectedFriend && userShips && friendShips && (
                <Container>
                    <Row className="justify-content-center align-items-start my-5">
                        <Col xs={12} md={6} lg={5} className="mb-4 mb-md-0">
                            <h2>Your Fleet</h2>
                            <FleetCard ships={userShips}/>
                        </Col>
                        <Col xs={12} md={6} lg={5}>
                            <h2>Friend's Fleet</h2>
                            <FleetCard ships={friendShips}/>
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
            {battleReport && !selectedFriend && (
                <div className="my-3">
                    <BattleReport winner={winner} text={battleReport}/>
                </div>
            )}
        </Container>
        </div>
    )
}

export default Battle