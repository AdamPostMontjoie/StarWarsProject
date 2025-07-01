import { MongoClient, ServerApiVersion } from "mongodb";
console.log('db/connection.js - process.env.ATLAS_URI at import time:', process.env.ATLAS_URI);

let _db;

export async function connectToDatabase(uri) {
  if (_db) {
    return _db;
  }

  if (!uri || !uri.startsWith('mongodb')) {
      throw new Error("Invalid MongoDB connection string provided.");
  }
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1
     // strict: true,
     // deprecationErrors: true,
    },
    ssl:true,
  });

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
    "Pinged your deployment. You successfully connected to MongoDB!"
    );
    _db = client.db("star_wars_db");
    return _db;
  } catch(err) {
    console.error("fuck",err);
    throw err;
  }
}

export function getDb() {
  if (!_db) {
    throw new Error("Database not connected. Call connectToDatabase first.");
  }
  return _db;
}