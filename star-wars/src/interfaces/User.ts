export interface User {
    email: string,
    uid:string,
    friends?:{
        uid:string, 
        email:string
    }[]
}