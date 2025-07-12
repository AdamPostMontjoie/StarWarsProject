import express from "express"

export default function createEnemyFleetRouter(db) {
    const router = express.Router() 
    router.get("/", async (req, res) => {
        try {
            let level = parseInt(req.query.level)
            let collection = db.collection("enemy_fleet");
            let results = await collection.findOne({level:level})
            res.status(200).send(results);
        } catch (err) {
            console.error(err);
            res.status(500).send("Error retrieving fleet from database");
        }
    }); 
    

    return router;
}