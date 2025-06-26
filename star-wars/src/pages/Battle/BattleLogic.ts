//export functions that determine the winner of battles from here
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
        battleOutCome.winner = "Friend";
        battleOutCome.winnerBaseScore = friendBasePower;
        battleOutCome.winnerSpeedBoostFactor = friendSpeedMultiplier;
        battleOutCome.winnerFleetSize = friendFleet.quantity;
        battleOutCome.loserBaseScore = userBasePower;
        battleOutCome.loserSpeedBoostFactor = userSpeedMultiplier;
        battleOutCome.loserFleetSize = userFleet.quantity;
    }
    return battleOutCome
}

//returns user's chance of victory

export async function startBattle(userShips:FavoriteShip[],friendShips:FavoriteShip[]){
    console.log("battle has begun")
    //assess fleets
    const userFleetStats = determineFleetStats(userShips);
    const friendFleetStats = determineFleetStats(friendShips);
    //determine odds of victory
    const outcome:Outcome = determineVictory(userFleetStats,friendFleetStats)
}