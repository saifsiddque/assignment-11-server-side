const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, Collection, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

//middle ware
app.use(cors())
app.use(express.json())

//user: dbuserassig
//password: Pcmb5QZVboNCvCAv


const uri = "mongodb+srv://dbuserassig:Pcmb5QZVboNCvCAv@cluster0.nyumefd.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
      const serviceCollection = client.db('assignment-11').collection('services')

      app.get('/services', async(req, res)=>{
        const query = {};
        const cursor = serviceCollection.find(query);
        const services = await cursor.toArray();
        res.send(services);
      });

      app.get('/services/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const services = await serviceCollection.findOne(query);
        res.send(services);

      })

      app.post('/services', async(req, res)=>{
        const service = req.body
        console.log(service)
        const result = await serviceCollection.insertOne(service)
        res.send(result)
      })

      app.put('/users/:id', async(req, res)=>{
        const id = req.params.id;
        const filter = {_id: ObjectId(id)};
        const user = req.body;
        const options = {upsert: true}
        const updatedUser = {
          $set: {
            name: user.name,
            address: user.email
          }
        }
        const result = await userCollection.updateOne(filter, updatedUser, options);
        res.send(result);
      })

      app.delete('/users/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await userCollection.deleteOne(query)
        console.log(result);
        res.send(result)
      })
    } 
    finally {
    }
  }
  run().catch(err => console.log(err));

  




app.get( '/' , (req , res) =>{
    res.send('Allah Hu Akbar')
});

app.listen(port, () =>{
    console.log(` Server Running On Poort ${port}`);
} )