const { MongoClient } = require("mongodb");
require('dotenv').config();

// Replace the uri string with your connection string.
const uri =
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@cluster0.udbqgft.mongodb.net/?retryWrites=true&w=majority`;
  console.log({uri})
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: "Back to the Future" };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
