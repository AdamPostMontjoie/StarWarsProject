import React, { useEffect, useState } from 'react';
import { Container, Row,Col, Button, Dropdown, Card} from 'react-bootstrap';
import axios from 'axios';
import FleetCard from './FleetCard';
import { useAuth } from '../../contexts/authContext';
import Staging from './Staging';
import { FavoriteShip, nonUserShip } from '../../interfaces/Ship';
import BattleReport from './BattleReport';

const Battle = ({userShips, setUserShips, resetGame} : {userShips:nonUserShip[] | FavoriteShip[], setUserShips:any, resetGame:any}) => {
    const [enemyShips,setEnemyShips] = useState<nonUserShip[]>([]);
    return (
        <div>
            <Staging userShips={userShips} enemyShips={enemyShips} setEnemyShips={setEnemyShips}/>
        </div>
    )
}

export default Battle