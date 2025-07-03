export interface ShipProperties {
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    cost_in_credits: string;
    created: string;
    edited: string;
    films: string[];
    hyperdrive_rating: string;
    length: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    model: string;
    crew:string;
    name: string;
    passengers: number;
    pilots: string[];
    starship_class: string;
    url: string;
  }
  
  export interface Ship {
    uid: string;
    properties: ShipProperties;
    description: string;
    __v: number;         
    _id: string; 
  }

  export interface FavoriteShip{
    uid: string;
    properties: ShipProperties;
    description: string;
    __v: number;         
    _id: string; 
    quantity: number;
  }
  export interface nonUserShip{
    properties: ShipProperties;
    description: string;
    __v: number;         
    _id: string; 
    quantity: number;
  }