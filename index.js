
const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const port = process.env.PORT || 5001

app.use(cors());
app.use(express.json());


// userName
// nizamuddin15bd

// password
// KYt3K6tycjGVLKhN



const uri = "mongodb+srv://nizamuddin15bd:KYt3K6tycjGVLKhN@cluster0.ttqfboy.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("foodExpress").command({ ping: 1 });
    const userCollection = client.db("foodExpress").collection("user");


    // user get
    app.get('/user', async(req, res) =>{
      const query = {}
      const cursor = userCollection.find(query)
      const users = await cursor.toArray()
      res.send(users);
    })


    // POST: add a new user
    app.post('/user', async(req, res) =>{
      const newUser = req.body;
      console.log('adding new user', newUser)
      const result = await userCollection.insertOne(newUser)
      res.send(result);
    })
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})