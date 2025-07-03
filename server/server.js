import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import { connectToDatabase } from './db/connection.js';
import createStarshipsRouter from './routes/ships.js';
import createUsersRouter from './routes/users.js'
import createAvailableShipsRouter from './routes/availableships.js';
import createAIRouter from './routes/ai.js';
import { GoogleGenAI } from "@google/genai";
const PORT = process.env.PORT || 5050; 
const app = express();

app.use(cors());
app.use(express.json());

async function startApplication() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const db = await connectToDatabase(process.env.ATLAS_URI);
    app.use("/starships", createStarshipsRouter(db));
    app.use('/users', createUsersRouter(db));
    app.use('/ai', createAIRouter(ai))
    app.use('/availableships', createAvailableShipsRouter(db))

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startApplication();