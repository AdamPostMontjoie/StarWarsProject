import express from "express"
import { ObjectId } from "mongodb"

export default function createAvailableShipsRouter(db) {
    const router = express.Router() 
    router.get("/", async (req, res) => {
        try {
            let collection = db.collection("available_starships");
            let results = await collection.find().toArray();
            res.status(200).send(results);
        } catch (err) {
            console.error(err);
            res.status(500).send("Error retrieving starships from database");
        }
    }); 
    
    router.post("/", async (req, res) => {
        try{
            const ship = req.body;
            let collection = db.collection("available_starships");
            let result = await collection.insertOne(ship);
            res.status(201).send(result); 
        } catch (err) {
            console.error(err);
            res.status(500).send("Error adding starship to database");
        }
    });

    return router;
}