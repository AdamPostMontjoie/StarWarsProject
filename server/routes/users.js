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

    router.patch('/:id', async (req, res) =>{
        try{
            let collection = db.collection("users"); 
            let {friendUid, friendEmail,userEmail } = req.body
            let uid = req.params.id

            const currentUserData = await collection.findOne({ uid: uid });
            if (currentUserData && currentUserData.friends && currentUserData.friends.some((f) => f.uid === friendUid)) {
                return res.status(409).send({ message: "Friend already added to your list." });
            }

            let result = await collection.updateOne({uid:uid},{$push:{friends:{uid:friendUid,email:friendEmail}}})
            await collection.updateOne({uid:friendUid},{$push:{friends:{uid:uid,email:userEmail}}})
            res.status(200).send(result)
        }  
        catch(err){
            console.error(err)
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
            //no need for a new delete route
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

    return router;
}