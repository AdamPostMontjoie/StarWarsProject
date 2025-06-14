export interface ShipProperties {
    MGLT: string;
    cargo_capacity: number;
    consumables: string;
    cost_in_credits: number;
    created: string;
    edited: string;
    films: string[];
    hyperdrive_rating: number;
    length: number;
    manufacturer: string;
    max_atmosphering_speed: number;
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