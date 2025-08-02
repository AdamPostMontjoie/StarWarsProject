import React, { useEffect, useState } from 'react';
import { nonUserShip, FavoriteShip } from '../../interfaces/Ship';
import { Container, Row, Col, Button, Dropdown, Card } from 'react-bootstrap';
import ClassCard from './ClassCard';
import { handleCombatRound } from './BattleLogic';

const Combat = ({ userShips, enemyShips }: { userShips: nonUserShip[] | FavoriteShip[], enemyShips: nonUserShip[] }) => {
    const [capitalShips, setCapitalShips] = useState(userShips.filter((ship) => ship.properties.class === "Capital"))
    const [starfighters, setStarfighters] = useState(userShips.filter((ship) => ship.properties.class === "Starfighter"))
    const [bombers, setBombers] = useState(userShips.filter((ship) => ship.properties.class === "Bomber"))
    const [eCapitalShips, setECapitalShips] = useState(enemyShips.filter((ship) => ship.properties.class === "Capital"))
    const [eStarfighters, setEStarfighters] = useState(enemyShips.filter((ship) => ship.properties.class === "Starfighter"))
    const [eBombers, setEBombers] = useState(enemyShips.filter((ship) => ship.properties.class === "Bomber"))

    //class turn info
    const [userClass, setUserClass] = useState<nonUserShip[] | FavoriteShip[]>([]);
    const [userClassSelected, setuserClassSelected] = useState(false);
    const [userTarget, setUserTarget] = useState<nonUserShip[]>([]);
    const [userTargetSelected, setUserTargetSelected] = useState(false);
    // const [enemyClass, setEnemyClass] = useState<nonUserShip[]>([]);
    // const [enemyClassSelected, setEnemyClassSelected] = useState(false);
    // const [enemyTarget, setEnemyTarget] = useState<nonUserShip[] | FavoriteShip[]>([]);
    // const [enemyTargetSelected, setEnemyTargetSelected] = useState(false);

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
    function handleTurn(){
            //choose enemy classes
            const enemyClasses = [];
            if (eCapitalShips.length > 0) enemyClasses.push(eCapitalShips);
            if (eStarfighters.length > 0) enemyClasses.push(eStarfighters);
            if (eBombers.length > 0) enemyClasses.push(eBombers);
            const userClasses = [];
            if (capitalShips.length > 0) userClasses.push(capitalShips);
            if (starfighters.length > 0) userClasses.push(starfighters);
             if (bombers.length > 0) userClasses.push(bombers);
            //run combat calculations
            if(userClassSelected && userTargetSelected && enemyClasses.length > 0 && userClasses.length > 0 && !gameOver){
                const result =  handleCombatRound(userClass, userTarget,enemyClasses, userClasses)
                console.log(result.userClasses); 
                console.log(result.gameOver)
                setUserTargetSelected(false)
                setuserClassSelected(false)
                setUserClass([])
                setUserTarget([])
                //return object then set all state variables to new values
            }
    }

    return (
        <div>
            <h1>Active battle</h1>

            <Container className="my-5">
                <Row className="justify-content-center align-items-start">

                    <Col xs={12} md={6} lg={5} className="mb-4 mb-md-0">
                        <h2 className="text-center text-primary">Your Fleet</h2>
                        <hr className="my-3"/>
                        {capitalShips.length > 0 && (
                            <Row className="justify-content-center align-items-start my-4">
                                <Col xs={12} onClick={()=>selectClass(capitalShips)} className="mb-4 mb-md-0">
                                    <h4 className="text-center text-info">Capital Ships</h4>
                                    <ClassCard ships={capitalShips}/>
                                </Col>
                            </Row>
                        )}
                        {starfighters.length > 0 && (
                            <Row className="justify-content-center align-items-start my-4">
                                <Col onClick={()=>selectClass(starfighters)} xs={12} className="mb-4 mb-md-0">
                                    <h4 className="text-center text-info">Starfighters</h4>
                                    <ClassCard ships={starfighters}/>
                                </Col>
                            </Row>
                        )}

                        {bombers.length > 0 && (
                            <Row className="justify-content-center align-items-start my-4">
                                <Col xs={12} onClick={()=>selectClass(bombers)} className="mb-4 mb-md-0">
                                    <h4 className="text-center text-info">Bombers</h4>
                                    <ClassCard ships={bombers}/>
                                </Col>
                            </Row>
                        )}

                        
                    </Col>
                    
                    <Col xs={12} md={6} lg={5} className="mb-4 mb-md-0 ms-md-4">
                        <h2 className="text-center mb-3 text-danger">Enemy Fleet</h2>
                        <hr className="my-3"/>
                        {eCapitalShips.length > 0 && (
                            <Row className=" justify-content-center align-items-start my-4">
                                <Col xs={12} onClick={()=>selectUserTarget(eCapitalShips)} className="mb-4 mb-md-0">
                                    <h4 className="text-center text-danger">Capital Ships</h4>
                                    <ClassCard ships={eCapitalShips}/>
                                </Col>
                            </Row>
                        )}
                        {eStarfighters.length > 0 && (
                            <Row className="justify-content-center align-items-start my-4">
                                <Col xs={12} onClick={()=>selectUserTarget(eStarfighters)} className="mb-4 mb-md-0">
                                    <h4 className="text-center text-danger">Starfighters</h4>
                                    <ClassCard ships={eStarfighters}/>
                                </Col>
                            </Row>
                        )}

                        {eBombers.length > 0 && (
                            <Row className="justify-content-center align-items-start my-4">
                                <Col xs={12} onClick={()=>selectUserTarget(eBombers)} className="mb-4 mb-md-0">
                                    <h4 className="text-center text-danger">Bombers</h4>
                                    <ClassCard ships={eBombers}/>
                                </Col>
                            </Row>
                        )}

                        
                    </Col>
                </Row>
                {userClassSelected && userTargetSelected && (
                    <Button onClick={()=>handleTurn()}>Turn</Button>
                )}
                
            </Container>
        </div>
    );
}

export default Combat;