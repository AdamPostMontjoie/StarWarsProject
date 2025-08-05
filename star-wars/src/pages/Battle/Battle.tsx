import React, { useEffect, useState } from 'react';
import { Container, Row,Col, Button, Dropdown, Card} from 'react-bootstrap';
import axios from 'axios';
import FleetCard from '../../components/FleetCard';
import { useAuth } from '../../contexts/authContext';
import Staging from './Staging';
import Combat from './Combat';
import { FavoriteShip, nonUserShip } from '../../interfaces/Ship';
import BattleReport from './BattleReport';
import { buildPrompt } from './GeminiPrompt';

const Battle = ({userShips, resetGame} : {userShips:nonUserShip[] | FavoriteShip[],  resetGame:any}) => {
    const [enemyShips,setEnemyShips] = useState<nonUserShip[]>([]);
    const [ready, setReady] = useState(false);
    const [gameOver, setGameOver] = useState(false)
    const [aiLoading,setAiLoading] = useState(false)
    const [battleReport, setBattleReport] = useState<string>("")
    const [winner,setWinner] = useState("")
    const [aiRequestCompleted, setAiRequstCompleted] = useState(false)
    const {userLoggedIn} = useAuth()
    
    // New state to store battle data
    const [battleData, setBattleData] = useState<any>(null);

    function endGameNoAi(){
        setReady(false)
        setGameOver(true)
    }

    function reset(){
        setBattleReport("")
    }

    async function getBattleReportFromAI() {
      if (!battleData) return;

      setReady(false);
      setGameOver(true);
      const { userTurnLog, enemyTurnLog, initialUserClasses, initialEnemyClasses, winner } = battleData;
      const prompt = buildPrompt(userTurnLog, enemyTurnLog, initialUserClasses, initialEnemyClasses, winner);

      console.log(prompt);
      setAiLoading(true);

      try {
        const response = await axios.post("https://starwars-backend-z23b.onrender.com/ai", { prompt: prompt });
        console.log(response.data.result);
        setAiLoading(false);
        setBattleReport(response.data.result);
        setReady(false);
        setAiRequstCompleted(true);
      } catch (err) {
        console.error("failed request");
        setAiLoading(false);
        setBattleReport("Gemini failed to respond");
        setReady(false);
        setAiRequstCompleted(false);
      }
    }
    
    // This is the function that gets called after combat
    function recordBattleData(
        userTurnLog: string[][],
        enemyTurnLog: string[][],
        initialUserClasses: (nonUserShip[] | FavoriteShip[])[],
        initialEnemyClasses: (nonUserShip[] | FavoriteShip[])[],
        winner: string
    ) {
      const data = { userTurnLog, enemyTurnLog, initialUserClasses, initialEnemyClasses, winner };
      setBattleData(data);
    }
    
    // We now have a separate effect to trigger the AI call once battle data is recorded
    useEffect(() => {
      if(battleData) {
        getBattleReportFromAI();
      }
    }, [battleData]);

    return (
        <div>
            <div>
            {!ready && !battleReport && !aiLoading &&(
                <Staging setReady={setReady} userShips={userShips} enemyShips={enemyShips} setEnemyShips={setEnemyShips}/>
            )}
            </div>
            <div>
            {ready && !battleReport&& (
                <div>
                    <Combat endGame={recordBattleData} userShips={userShips} enemyShips={enemyShips}/>
                    <Button onClick={()=>endGameNoAi()} >Exit Battle</Button>
                </div>
            )}
            {aiLoading && (
                <div className="my-3">
                    Analyzing battle... Awaiting transmission from the AI.
                </div>
            )}
            {battleReport  && (
                <div className="my-3">
                    <BattleReport retry={getBattleReportFromAI} aiRequestCompleted={aiRequestCompleted} loggedIn={userLoggedIn} reset={reset} winner={winner} text={battleReport}/>
                </div>
            )}
            </div>
        </div>
    )
}

export default Battle;