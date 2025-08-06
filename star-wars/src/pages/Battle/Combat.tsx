import React, { useEffect, useState } from 'react';
import { nonUserShip, FavoriteShip } from '../../interfaces/Ship';
import { Container, Row, Col, Button, Dropdown, Card } from 'react-bootstrap';
import ClassCard from './ClassCard';
import LogBox from './LogBox';
import { handleUserTurn,handleEnemyTurn } from './BattleLogic';
import { EnemyTurnResult, UserTurnResult } from '../../interfaces/Battle';
import './Combat.css'; 

const Combat = ({ userShips, enemyShips, endGame }: { userShips: nonUserShip[] | FavoriteShip[], enemyShips: nonUserShip[], endGame:any}) => {
    const [capitalShips, setCapitalShips] = useState(userShips.filter((ship) => ship.properties.class === "Capital"))
    const [starfighters, setStarfighters] = useState(userShips.filter((ship) => ship.properties.class === "Starfighter"))
    const [bombers, setBombers] = useState(userShips.filter((ship) => ship.properties.class === "Bomber"))
    const [eCapitalShips, setECapitalShips] = useState(enemyShips.filter((ship) => ship.properties.class === "Capital"))
    const [eStarfighters, setEStarfighters] = useState(enemyShips.filter((ship) => ship.properties.class === "Starfighter"))
    const [eBombers, setEBombers] = useState(enemyShips.filter((ship) => ship.properties.class === "Bomber"))
    const [userTurnLog, setUserTurnLog] = useState<string[][]>([])
    const [enemyTurnLog, setEnemyTurnLog] = useState<string[][]>([])
    const [turnIndex, setTurnIndex] = useState(-1)
    const [isUserTurn, setIsUserTurn] = useState(true)
    const [userTurnData,setUserTurnData] = useState<UserTurnResult>()
    const [enemyTurnData, setEnemyTurnData] = useState<EnemyTurnResult>()
    const [initialUserClasses, setInitialUserClasses] = useState<(nonUserShip[] | FavoriteShip[])[]>()
    const [initialEnemyClasses, setInitialEnemyClasses] = useState<(nonUserShip[] | FavoriteShip[])[]>()
    const [winner,setWinner] = useState("")

    //class turn info
    const [userClass, setUserClass] = useState<nonUserShip[] | FavoriteShip[]>([]);
    const [userClassSelected, setuserClassSelected] = useState(false);
    const [userTarget, setUserTarget] = useState<nonUserShip[] | FavoriteShip[]>([]);
    const [userTargetSelected, setUserTargetSelected] = useState(false);

    //game status info
    const [gameOver, setGameOver] = useState(false);

    function selectClass(userClassChosen:nonUserShip[] | FavoriteShip[]){
        if(userClassSelected){
            if(userClassChosen === userClass){
                //deselection
                setUserClass([])
                setuserClassSelected(false)
                setUserTarget([])
                setUserTargetSelected(false)
            }
        } else{
            setUserClass(userClassChosen)
            setuserClassSelected(true)
        }
    }

    function selectUserTarget(UserTargetChosen:nonUserShip[] | FavoriteShip[]){
        if(userTargetSelected){
            if(userTarget === UserTargetChosen){
                //deselection
                setUserTarget([])
                setUserTargetSelected(false)
            }
        } else{
            if(userClassSelected){
                setUserTarget(UserTargetChosen)
                setUserTargetSelected(true)
            }  
        }
    }

    //get rid of useeffect, taketurn button
    function handleUserAttack(){
            setIsUserTurn(false)
            //choose enemy classes
            const enemyClasses = [];
            if (eCapitalShips.length > 0) enemyClasses.push(eCapitalShips);
            if (eStarfighters.length > 0) enemyClasses.push(eStarfighters);
            if (eBombers.length > 0) enemyClasses.push(eBombers);
            
            const userClasses = [];
            if (capitalShips.length > 0) userClasses.push(capitalShips);
            if (starfighters.length > 0) userClasses.push(starfighters);
            if (bombers.length > 0) userClasses.push(bombers);
            if(turnIndex === -1){
                setInitialEnemyClasses(enemyClasses)
                setInitialUserClasses(userClasses)
            }
            //run combat calculations
            if(userClassSelected && userTargetSelected && enemyClasses.length > 0 && userClasses.length > 0 && !gameOver){
                const userResult =   handleUserTurn(userClass, userTarget, enemyClasses, userClasses);
                setUserTurnData(userResult)
                console.log(userResult.userClasses); 
                console.log(userResult.enemyClasses)
                console.log(userResult.userTurnLog)
                console.log(userResult.gameOver)
                //deselect targets
                setUserTargetSelected(false)
                setuserClassSelected(false)
                setUserClass([])
                setUserTarget([])
                //set all ships empty 
                setCapitalShips([]);
                setStarfighters([]);
                setBombers([]);
                setECapitalShips([]);
                setEStarfighters([]);
                setEBombers([]);
                //set all state variables to new values
                setGameOver(userResult.gameOver)
                setWinner(userResult.winner)
                if(userResult.gameOver){
                    userResult.userTurnLog.push(`Game is now complete, won by ${userResult.winner}`)
                }
                setUserTurnLog(prevData => [...prevData,userResult.userTurnLog])
                //setEnemyTurnLog(prevData => [...prevData,.enemyTurnLog])
                setTurnIndex(turnIndex + 1)
                userResult.userClasses.forEach((a)=> {
                    const currentClassType = a[0].properties.class
                    if(currentClassType === "Capital"){
                        setCapitalShips(a)
                    }  else if(currentClassType === "Starfighter"){
                        setStarfighters(a)
                    } else if(currentClassType === "Bomber"){
                        setBombers(a)
                    }
                });
                userResult.enemyClasses.forEach((a)=> {
                    const currentClassType = a[0].properties.class
                    if(currentClassType === "Capital"){
                        setECapitalShips(a)
                    }  else if(currentClassType === "Starfighter"){
                        setEStarfighters(a)
                    } else if(currentClassType === "Bomber"){
                        setEBombers(a)
                    }
                }); 
                //end game condition
                if(userResult.gameOver){
                    console.log("game is now finished")
                }
            }
    }
    function handleEnemyAttack(){
        setIsUserTurn(true)
        if(userTurnData && !gameOver){
            const enemyResult = handleEnemyTurn(userTurnData.userClasses, userTurnData.enemyClasses);
            console.log(enemyResult.userClasses); 
                console.log(enemyResult.enemyClasses)
                console.log(enemyResult.enemyTurnLog)
                console.log(enemyResult.gameOver)
            setEnemyTurnData(enemyResult);
            
            //clear all ships
            setCapitalShips([]);
            setStarfighters([]);
            setBombers([]);
            setECapitalShips([]);
            setEStarfighters([]);
            setEBombers([]);
            setGameOver(enemyResult.gameOver)
            setWinner(enemyResult.winner)
            if(enemyResult.gameOver){
                enemyResult.enemyTurnLog.push(`Game is now complete, won by ${enemyResult.winner}`)
            }
            setEnemyTurnLog(prevData => [...prevData, enemyResult.enemyTurnLog]);
            enemyResult.userClasses.forEach((a)=> {
                const currentClassType = a[0].properties.class
                if(currentClassType === "Capital"){
                    setCapitalShips(a)
                }  else if(currentClassType === "Starfighter"){
                    setStarfighters(a)
                } else if(currentClassType === "Bomber"){
                    setBombers(a)
                }
            });
            enemyResult.enemyClasses.forEach((a)=> {
                const currentClassType = a[0].properties.class
                if(currentClassType === "Capital"){
                    setECapitalShips(a)
                }  else if(currentClassType === "Starfighter"){
                    setEStarfighters(a)
                } else if(currentClassType === "Bomber"){
                    setEBombers(a)
                }
            }); 
            
            // Check for game over condition
            if(enemyResult.gameOver){
                console.log("game is now finished");
                
            }
        }
    }
    return (
        <div className='combat-container'>
            <h1 className="combat-main-heading">Active Battle</h1>

            <Container fluid className="battle-container">
                <Row className="justify-content-center align-items-stretch battle-row-height">
                    
                    {/* User Fleet */}
                    <Col xs={12} md={6} lg={5} className="mb-4 mb-md-0 d-flex flex-column">
                        <h2 className="combat-user-heading">Your Fleet</h2>
                        <hr className="my-3"/>
                        <div className="fleet-scroll-area">
                            {capitalShips.length > 0 && (
                                <div onClick={isUserTurn ? () => selectClass(capitalShips) : undefined} 
                                    className={`clickable-fleet-class ${userClass === capitalShips ? 'selected-user-class' : ''}`}>
                                    <h4 className="text-center text-info">Capital Ships</h4>
                                    <ClassCard ships={capitalShips}/>
                                </div>
                            )}
                            {starfighters.length > 0 && (
                                <div onClick={isUserTurn ? () => selectClass(starfighters) : undefined} 
                                    className={`clickable-fleet-class ${userClass === starfighters ? 'selected-user-class' : ''}`}>
                                    <h4 className="text-center text-info">Starfighters</h4>
                                    <ClassCard ships={starfighters}/>
                                </div>
                            )}
                            {bombers.length > 0 && (
                                <div onClick={isUserTurn ? () => selectClass(bombers) : undefined} 
                                    className={`clickable-fleet-class ${userClass === bombers ? 'selected-user-class' : ''}`}>
                                    <h4 className="text-center text-info">Bombers</h4>
                                    <ClassCard ships={bombers}/>
                                </div>
                            )}
                        </div>
                    </Col>
                    
                    {/* Battle Log in Center */}
                    <Col xs={12} md={12} lg={2} className="d-flex align-items-center justify-content-center">
                        <div className='battlelog-wrapper my-4 my-lg-0'>
                            {turnIndex > -1 && (
                                isUserTurn 
                                    ? <LogBox battleLog={enemyTurnLog[turnIndex]}/> 
                                    : <LogBox battleLog={userTurnLog[turnIndex]}/>
                            )}
                        </div>
                    </Col>
                    
                    {/* Enemy Fleet */}
                    <Col xs={12} md={6} lg={5} className="mb-4 mb-md-0 d-flex flex-column">
                        <h2 className="combat-enemy-heading">Enemy Fleet</h2>
                        <hr className="my-3"/>
                        <div className="fleet-scroll-area">
                            {eCapitalShips.length > 0 && (
                                <div onClick={isUserTurn ? () => selectUserTarget(eCapitalShips) : undefined} 
                                    className={`clickable-fleet-class ${userTarget === eCapitalShips ? 'selected-enemy-target' : ''}`}>
                                    <h4 className="text-center text-danger">Capital Ships</h4>
                                    <ClassCard ships={eCapitalShips}/>
                                </div>
                            )}
                            {eStarfighters.length > 0 && (
                                <div onClick={isUserTurn ? () => selectUserTarget(eStarfighters) : undefined} 
                                    className={`clickable-fleet-class ${userTarget === eStarfighters ? 'selected-enemy-target' : ''}`}>
                                    <h4 className="text-center text-danger">Starfighters</h4>
                                    <ClassCard ships={eStarfighters}/>
                                </div>
                            )}
                            {eBombers.length > 0 && (
                                <div onClick={isUserTurn ? () => selectUserTarget(eBombers) : undefined} 
                                    className={`clickable-fleet-class ${userTarget === eBombers ? 'selected-enemy-target' : ''}`}>
                                    <h4 className="text-center text-danger">Bombers</h4>
                                    <ClassCard ships={eBombers}/>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
                
                {/* Buttons Row */}
                <Row className="justify-content-center my-4">
                    <Col xs={12} className="text-center">
                        {userClassSelected && userTargetSelected && !gameOver && isUserTurn && (
                            <Button onClick={()=>handleUserAttack()} className="combat-action-button mx-2">Take Turn</Button>
                        )} 
                        {!isUserTurn && !gameOver && (
                            <Button onClick={()=>handleEnemyAttack()} className="combat-action-button mx-2">Start Enemy Attack</Button>
                        )}
                        {gameOver && (
                            <Button onClick={()=>endGame(userTurnLog,enemyTurnLog,initialUserClasses,initialEnemyClasses,winner)} className="combat-gameover-button mx-2">End Game and Generate AI Report</Button>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Combat;