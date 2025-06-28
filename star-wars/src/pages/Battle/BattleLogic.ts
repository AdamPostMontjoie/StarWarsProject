//export functions that determine the winner of battles from here
import axios from "axios";
import { FavoriteShip } from "../../interfaces/Ship"
//returns fleet speed, fleet physical size, quantity, and overall power
// fleet with higher speed gets boosted odds, even if below in other cats
interface FleetStats {
    quantity:number,
    speed:number,
    size:number,
}
interface Outcome {
    winner: string,
    odds: number, //never tell me them
    winnerBaseScore: number,
    winnerSpeedBoostFactor: number,
    winnerFleetSize: number,
    loserBaseScore: number,
    loserSpeedBoostFactor: number,
    loserFleetSize: number
}


//gathers the stats on the fleet's power to be weighed
function determineFleetStats(ships:FavoriteShip[]):FleetStats{
    let fleet: FleetStats = { quantity: 0, speed: 0, size: 0};
    for(let i = 0; i < ships.length; i++){
        let ship = ships[i]
        let q = ship.quantity;
        fleet.quantity += q
        for(let j = 0; j < q; j++){
            //must remove all letters from
            let numericSpeed = parseInt(ship.properties.max_atmosphering_speed.replace(/\D/g, ''))
            let numericSize = parseInt(ship.properties.length.replace(/\D/g, ''))
            if(!isNaN(numericSpeed)){
                fleet.speed += numericSpeed;
            }  
            if(!isNaN(numericSize)){
                fleet.size += numericSize;
            }
            
        } 
    }
    return fleet;
}
function determineVictory(userFleet:FleetStats,friendFleet:FleetStats):Outcome{
    const battleOutCome:Outcome = {
        winner: "",
        odds: 0,
        winnerBaseScore: 0,
        winnerSpeedBoostFactor: 0,
        winnerFleetSize: 0,
        loserBaseScore: 0,
        loserSpeedBoostFactor: 0,
        loserFleetSize: 0
    }
    const SPEED_BOOST_FACTOR = 1.5;
    const QUANTITY_WEIGHT = 10;
    const SIZE_WEIGHT = 0.5;
     //each ship is worth 10 points, each meter is .5 points
    const userBasePower = (userFleet.quantity * QUANTITY_WEIGHT)  + (userFleet.size * SIZE_WEIGHT);
    const friendBasePower = (friendFleet.quantity * QUANTITY_WEIGHT)  + (friendFleet.size * SIZE_WEIGHT);
    let userSpeedMultiplier = 1;
    let friendSpeedMultiplier = 1;
    if (userFleet.speed > friendFleet.speed && friendFleet.speed > 0) {
        const speedRatio = userFleet.speed / friendFleet.speed;
        userSpeedMultiplier = speedRatio * SPEED_BOOST_FACTOR;
    } else if (friendFleet.speed > userFleet.speed && userFleet.speed > 0) {
        const speedRatio = friendFleet.speed / userFleet.speed;
        friendSpeedMultiplier = speedRatio * SPEED_BOOST_FACTOR;
    } else if (userFleet.speed === 0 && friendFleet.speed === 0) {
        userSpeedMultiplier = 1;
        friendSpeedMultiplier = 1;
    } 
    //if user or friend has 0 speed
     else if (userFleet.speed > 0 && friendFleet.speed === 0) {
        userSpeedMultiplier = 5
    } else if (friendFleet.speed > 0 && userFleet.speed === 0) {
        friendSpeedMultiplier = 5
    }
    const userFinalScore = userBasePower * userSpeedMultiplier;
    const friendFinalScore = friendBasePower * friendSpeedMultiplier;
    const totalScore = userFinalScore + friendFinalScore;
    const odds = userFinalScore / totalScore;
    const oddsResult = Math.random()
    battleOutCome.odds = odds * 100
    if( oddsResult <  odds){
        //user wins
        battleOutCome.winner = "User";
        battleOutCome.winnerBaseScore = userBasePower;
        battleOutCome.winnerSpeedBoostFactor = userSpeedMultiplier;
        battleOutCome.winnerFleetSize = userFleet.quantity;
        battleOutCome.loserBaseScore = friendBasePower;
        battleOutCome.loserSpeedBoostFactor = friendSpeedMultiplier;
        battleOutCome.loserFleetSize = friendFleet.quantity;
    } else if(oddsResult >= odds){
        //friend wins
        battleOutCome.winner = "Enemy";
        battleOutCome.winnerBaseScore = friendBasePower;
        battleOutCome.winnerSpeedBoostFactor = friendSpeedMultiplier;
        battleOutCome.winnerFleetSize = friendFleet.quantity;
        battleOutCome.loserBaseScore = userBasePower;
        battleOutCome.loserSpeedBoostFactor = userSpeedMultiplier;
        battleOutCome.loserFleetSize = userFleet.quantity;
    }
    return battleOutCome
}

function buildPrompt(outcome:Outcome,
        userShips:FavoriteShip[],
        friendShips:FavoriteShip[],
        userFleetStats:FleetStats,
        friendFleetStats:FleetStats
    ):string{
    const getUserFleetComposition = (ships: FavoriteShip[]) => {
        if (ships.length === 0) return 'no ships';
        return ships.map(ship => `${ship.quantity} ${ship.properties.name || 'unknown ship'}`).join(', ');
    };

    let prompt = ``
    const userFleetComposition = getUserFleetComposition(userShips);
    const friendFleetComposition = getUserFleetComposition(friendShips);
    prompt += `The User's fleet, composed of ${userFleetComposition}, engaged the Enemy's fleet, which deployed ${friendFleetComposition}. `;

    //numbers
    if (userFleetStats.quantity > friendFleetStats.quantity * 1.5) {
        prompt += "The User commanded a vastly larger force. ";
    } else if (friendFleetStats.quantity > userFleetStats.quantity * 1.5) {
        prompt += "The Enemy brought a significantly superior number of ships. ";
    } else if (userFleetStats.quantity > friendFleetStats.quantity) {
        prompt += "The User's fleet held a numerical advantage. ";
    } else if (friendFleetStats.quantity > userFleetStats.quantity) {
        prompt += "The Enemy's fleet outnumbered the User's. ";
    } else {
        prompt += "Both fleets were numerically matched. ";
    }
    
    //speed
    if (userFleetStats.speed > friendFleetStats.speed * 1.5) {
        prompt += "The User's fleet was exceptionally swift and agile. ";
    } else if (friendFleetStats.speed > userFleetStats.speed * 1.5) {
        prompt += "The Enemy's fleet moved with astonishing speed and precision. ";
    } else if (userFleetStats.speed > friendFleetStats.speed) {
        prompt += "The User's fleet had a notable speed advantage. ";
    } else if (friendFleetStats.speed > userFleetStats.speed) {
        prompt += "The Enemy's fleet possessed a distinct advantage in velocity. ";
    } else {
        prompt += "Both fleets were equally matched in speed. ";
    }

    //size
    if (userFleetStats.size > friendFleetStats.size * 1.5) {
        prompt += "The User's ships were considerably larger and more formidable. ";
    } else if (friendFleetStats.size > userFleetStats.size * 1.5) {
        prompt += "The Enemy's vessels were of immense scale and power. ";
    } else if (userFleetStats.size > friendFleetStats.size) {
        prompt += "The User's fleet comprised slightly larger vessels. ";
    } else if (friendFleetStats.size > userFleetStats.size) {
        prompt += "The Enemy's fleet consisted of somewhat larger ships. ";
    } else {
        prompt += "The fleets were comparable in overall size. ";
    }

    //odds
    if(outcome.odds <= 20){
        prompt += "The User's chances of victory were slim"
    } else if (outcome.odds > 20 && outcome.odds <= 40){
        prompt += "The User was an underdog in the odds, but not out of the fight"
    } else if (outcome.odds > 40 && outcome.odds <= 60){
        prompt += "The odds of victory were close enough that either side could win"
    } else if (outcome.odds > 60 && outcome.odds <= 80){
        prompt += "The User held a dominant edge in the odds, but they could not afford any mistakes"
    } else {
         prompt += "The User's victory seemed almost certain"
    }
    
    //winner
    if(outcome.winner === "User"){
        prompt += "The User ended up winning the battle over the Enemy"
    }
    else{
        prompt +="The Enemy ended up defeating the User's forces"
    }

    prompt += " Write a 2 paragraph Star Wars story about this battle. Do not include any numbers or numerical values in the story.";
    return prompt;
}

export async function startBattle(userShips:FavoriteShip[],friendShips:FavoriteShip[]){
    console.log("battle has begun")
    //assess fleets
    const userFleetStats = determineFleetStats(userShips);
    const friendFleetStats = determineFleetStats(friendShips);
    //determine victory
    const outcome:Outcome = determineVictory(userFleetStats,friendFleetStats)
    //build prompt for AI
    const prompt = buildPrompt(outcome,userShips,friendShips,userFleetStats,friendFleetStats)
    const response = await axios.post("http://localhost:5050/ai", {prompt:prompt})
    return {
        winner:outcome.winner,
        response:response.data
    }
}