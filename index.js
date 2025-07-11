const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.PASS}@cluster0.h2pknmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

        const useCollection = client.db("demoDB").collection("users");

        //step 1
        app.post('/users', async (req, res) => {
            const newUsers = req.body
            const result = await useCollection.insertOne(newUsers);
            res.send(result);
        })
        //step 2
        app.get('/users', async (req, res) => {
            const cursor = await useCollection.find().toArray();
            res.send(cursor);
        })

        //delete
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await useCollection.deleteOne(query);
            res.send(result);
            // console.log(id)
        })

        //update
        //step 1

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await useCollection.findOne(query);
            res.send(result);
        })

        //step 2

        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            console.log('úpdated', user)
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    name: user.name,
                    email: user.email
                }
            }
            const result = await useCollection.updateOne(filter, updatedDoc, options);
            res.send(result);

        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello word!!')
})
app.listen(port, () => {
    console.log(`Running port on :${port}`)
})