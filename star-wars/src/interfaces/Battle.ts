import { nonUserShip, FavoriteShip } from "./Ship";

export interface UserTurnResult {
    userClasses: (nonUserShip[] | FavoriteShip[])[];
    enemyClasses: (nonUserShip[] | FavoriteShip[])[];
    gameOver: boolean;
    userTurnLog: string[];
    winner:string;
}


export interface EnemyTurnResult {
    userClasses: (nonUserShip[] | FavoriteShip[])[];
    enemyClasses: (nonUserShip[] | FavoriteShip[])[];
    gameOver: boolean;
    enemyTurnLog: string[];
    winner:string
}

export interface classStats{
    health:number,
    attack:number,
    quantity:number
}

export interface multipliers{
    attackMultiplier:number,
    defenseMultiplier:number
}