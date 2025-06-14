//connection.js
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || ""; 

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server (this awaits for the connection)
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(
   "Pinged your deployment. You successfully connected to MongoDB!"
  );
} catch(err) {
  console.error(err); // If connection fails, it will log here
}

let db = client.db("star_wars_db"); // <<< Your database name (adjust if it's "star_wards_db")

export default db; // <<< This is how your db object is exposed