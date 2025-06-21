import express from "express"
import db from "../db/connection.js"
import { ObjectId } from "mongodb"
const router = express.Router() 

router.get('/', async (req, res) => {
    try {
        let collection = await db.collection("users"); 
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
    let collection = await db.collection("users"); 
    let results = await collection.findOne({uid:uid})

    res.status(200).send(results)
})

router.post('/', async (req, res) =>  {
    try{
        let collection = await db.collection("users"); 
    // refine later
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
        res.status(500).send("Error adding starship to database");
    }

})

//adds friends on both user ends
router.patch('/:id', async (req, res) =>{
    try{
        let collection = await db.collection("users"); 
        let {friendUid, friendEmail,userEmail } = req.body
        let uid = req.params.id

        //check for friend existence
        const currentUserData = await collection.findOne({ uid: uid });
        if (currentUserData && currentUserData.friends && currentUserData.friends.some((f) => f.uid === friendUid)) {
            return res.status(409).send({ message: "Friend already added to your list." });
        }

        //add friend both ways
        let result = await collection.updateOne({uid:uid},{$push:{friends:{uid:friendUid,email:friendEmail}}})
        await collection.updateOne({uid:friendUid},{$push:{friends:{uid:uid,email:userEmail}}})
        res.status(200).send(result)
    }  
    catch(err){
        console.error(err)
    }
})

export default router;