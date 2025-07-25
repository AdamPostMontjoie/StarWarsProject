import express from "express"
import { ObjectId } from "mongodb"

export default function createStarshipsRouter(db) {
    const router = express.Router() 

    router.get("/", async (req, res) => {
        try {
            const userId = req.query.uid
            let collection = db.collection("starships");
            let results = await collection.find({uid: userId}).toArray();
            res.status(200).send(results);
        } catch (err) {
            console.error(err);
            res.status(500).send("Error retrieving starships from database");
        }
    });  

    router.post("/", async (req, res) => {
        try{
            let shipProperties = req.body.properties
            const newStarship = {
                uid: req.body.uid,
                properties:shipProperties,
                description:"A starship",
                quantity:req.body.quantity,
                __v: 0
            }
            let collection = db.collection("starships"); 
            let existingShip = await collection.findOne({
                "uid": newStarship.uid,
                "properties.name":newStarship.properties.name,
            })
            if(existingShip == null){
                let result = await collection.insertOne(newStarship);
                res.status(201).send(result); 
            } else if(existingShip != null && existingShip.quantity !== newStarship.quantity){
                let result = await collection.findOneAndUpdate(
                    {"uid":existingShip.uid, "properties.name":existingShip.properties.name},
                    {$set:{"quantity":newStarship.quantity}}
                )
            }
            else{
                res.status(409).send({ message: "Starship with this name and quantity already exists." });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Error adding starship to database");
        }
    });

    router.delete("/:id", async (req, res) =>{
        try{
            const id = req.params.id
            let collection = db.collection("starships"); 
            const query = { _id: new ObjectId(id) };
            const result = await collection.deleteOne(query)
            if (result.deletedCount === 1) {
                res.status(200).json({ message: "Starship successfully deleted.", deletedCount: 1 });
            } else {
                res.status(404).json({ message: "Starship not found.", deletedCount: 0 });
            }
        }
        catch (err) {
            console.error("Error deleting starship:", err);
            res.status(500).send("Internal server error during deletion.");
        }
    })

    return router;
}