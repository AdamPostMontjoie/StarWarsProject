export interface ShipProperties {
    name:string,
    model:string,
    class:string,
    description:string,
    attack:number,
    health:number
    credits:number
  }
  
  export interface Ship {
    uid: string;
    properties: ShipProperties;
    __v: number;         
    _id: string; 
  }

  export interface FavoriteShip{
    uid: string;
    properties: ShipProperties;
    __v: number;         
    _id: string; 
    quantity: number;
  }
  export interface nonUserShip{
    properties: ShipProperties;
    __v: number;         
    _id: string; 
    quantity: number;
  }