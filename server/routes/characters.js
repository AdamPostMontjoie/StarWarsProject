import express from "express"
import db from "../db/connection.js"
import { ObjectId } from "mongodb"
const router = express.Router() 

router.get("/", async (req, res) => {
    try {
      const userId = req.query.uid;
      let collection = await db.collection("characters");
      let results = await collection.find({uid: userId}).toArray();
      res.status(200).send(results);
    } catch (err) {
      console.error(err);
      res.status(500).send("error retrieving characters from database")
    }
  });  
  router.post("/", async (req, res) => {
    try {
      let characterProperties = req.body.properties
      const newCharacter = {
        uid: req.body.uid,
        properties:characterProperties,
        description:"A character",
        __v: 0
      }
      let collection = await db.collection("characters"); 
      //checking for a dupe
      let existingCharacter = await collection.findOne({
        "uid":newCharacter.uid,
        "properties.name":newCharacter.properties.name,
      })
      if(existingCharacter == null){
        let result = await collection.insertOne(newCharacter);
        res.status(201).send(result); 
      }
      else{
        res.status(409).send({ message: "Character with this name already exists." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding character to database");
    }
  });
router.delete("/:id", async (req, res) =>{
    try{
        const id = req.params.id
        let collection = await db.collection("characters"); 
        const query = { _id: new ObjectId(id) };
        const result = await collection.deleteOne(query)
        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Character successfully deleted.", deletedCount: 1 });
        } else {
            res.status(404).json({ message: "Character not found.", deletedCount: 0 });
        }
    }
     catch (err) {
      console.error("Error deleting character:", err);
      res.status(500).send("Internal server error during deletion.");
    }
})

export default router;