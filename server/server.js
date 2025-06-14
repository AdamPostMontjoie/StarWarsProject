// server.js
import express from "express";
import cors from "cors";
import db from './db/connection.js'; 
import starships from './routes/ships.js'
import characters from './routes/characters.js'

const PORT = process.env.PORT || 5050; 
const app = express();

app.use(cors());
app.use(express.json());

app.use("/starships",starships)
app.use('/characters',characters)

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});