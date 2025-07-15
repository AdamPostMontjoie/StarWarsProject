import { FavoriteShip } from "./Ship";

export interface User {
    email: string,
    uid:string,
    ships:FavoriteShip[]
}