import React, { useEffect, useState } from 'react';
import { Container, Row,Col, Button, Dropdown, Card} from 'react-bootstrap';
import axios from 'axios';
import FleetCard from './FleetCard';
import { useAuth } from '../../contexts/authContext';
import Staging from './Staging';
import Combat from './Combat';
import { FavoriteShip, nonUserShip } from '../../interfaces/Ship';
import BattleReport from './BattleReport';

const Battle = ({userShips, resetGame} : {userShips:nonUserShip[] | FavoriteShip[],  resetGame:any}) => {
    const [enemyShips,setEnemyShips] = useState<nonUserShip[]>([]);
    const [ready, setReady] = useState(false);
    return (
        <div>
            <div>
            {!ready && (
                <Staging setReady={setReady} userShips={userShips} enemyShips={enemyShips} setEnemyShips={setEnemyShips}/>
            )}
            </div>
            <div>
            {ready && (
                <div>
                    <Combat userShips={userShips} enemyShips={enemyShips}/>
                    <Button onClick={()=>setReady(false)}>Exit Battle</Button>
                </div>
            )}
            </div>
    
            
        </div>
    )
}

export default Battle