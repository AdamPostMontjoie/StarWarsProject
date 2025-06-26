//export functions that determine the winner of battles from here
import { FavoriteShip } from "../../interfaces/Ship"

//returns fleet speed, fleet physical size, quantity, and overall power
// fleet with higher speed gets boosted odds, even if below in other cats

//change return array to object
function determineFleetPower(ships:FavoriteShip[]):number[]{
    let speed, quantity, size, power = 0;
    for(let i = 0; i < ships.length; i++){
        let q = ships[i].quantity;
        for(let j = 0; j < q; j++){

        }
    }
    return [5];
}

//returns user's chance of victory
function determineOdds(userFleetPower:any, friendFleetPower:any):number{

    return 99;
}

export async function startBattle(userShips:FavoriteShip[],friendShips:FavoriteShip[]){
    console.log("battle has begun")
    const userFleetPower = determineFleetPower(userShips);
    const friendFleetPower = determineFleetPower(friendShips);
    const odds = determineOdds(userFleetPower,friendFleetPower)
}