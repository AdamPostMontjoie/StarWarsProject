import express from "express"
import { ObjectId } from "mongodb"

export default function createUsersRouter(db) {
    const router = express.Router() 

    router.get('/', async (req, res) => {
        try {
            let collection = db.collection("users"); 
            let results = await collection.find().toArray()
            res.status(200).send(results)
        }
        catch(err){
            console.error(err)
            res.status(500).send("Could not get users")
        }
    }) 

    router.get('/:id', async (req, res) =>{
        let uid = req.params.id;
        let collection = db.collection("users"); 
        let results = await collection.findOne({uid:uid})

        res.status(200).send(results)
    })

    router.post('/', async (req, res) =>  {
        try{
            let collection = db.collection("users"); 
            let newUser = req.body
            let userByThisName = await collection.findOne({"email":newUser.email})
            if(!userByThisName){
                let result = await collection.insertOne(newUser)
                res.status(201).send(result)
            }
            else{
                res.status(409).send({ message: "User with this email already exists." });
            }
        }
        catch(err){
            console.error(err);
            res.status(500).send("Error adding user to database");
        }

    })
    router.put('/:id/ships', async (req, res) => {
        try {
            let collection = db.collection("users");
            let uid = req.params.id;
            let newShips = req.body.ships;

            if (!Array.isArray(newShips)) {
                return res.status(400).send({ message: "Invalid data: 'ships' must be an array." });
            }

            const shipsToSave = newShips.filter(ship => ship.quantity > 0);
            let result = await collection.updateOne(
                { uid: uid },
                { $set: { ships: shipsToSave } }
            );

            if (result.matchedCount === 0) {
                return res.status(404).send({ message: "User not found." });
            }

            res.status(200).send({ message: "User ships updated successfully.", result: result });
        } catch (err) {
            console.error("Error updating user ships:", err);
            res.status(500).send("Could not update user ships.");
        }
    })
    router.delete('/:id/ships', async (req, res) => {
        try {
            let collection = db.collection("users");
            let uid = req.params.id;
            let shipToDelete = req.body.ship;

            let result = await collection.updateOne(
                { uid: uid },
                { $pull: { ships: { "properties.name": shipToDelete } } }
            );

            if (result.matchedCount === 0) {
                return res.status(404).send({ message: "User not found." });
            }

            res.status(200).send({ message: "User ship deleted successfully.", result: result });
        } catch (err) {
            console.error("Error deleting user ship:", err);
            res.status(500).send("Could not delete user ship.");
        }
    })

    return router;
}