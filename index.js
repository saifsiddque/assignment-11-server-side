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
      const reviewCollection = client.db('assignment-11').collection('reviews')
      // SERVICE
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

      app.get('/reviews/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const reviews = await reviewCollection.findOne(query);
        res.send(reviews);

      })

      app.post('/services', async(req, res)=>{
        const service = req.body
        console.log(service)
        const result = await serviceCollection.insertOne(service)
        res.send(result)
      })
      // REVIEWS
      app.get('/reviews', async(req, res)=>{
        console.log(req.query);
        let query = {};
        if(req.query.email){
          query = {
            email : req.query.email
          }
        }
        if(req.query.service){
          query = {
            service : req.query.service
          }
        }
        const cursor = reviewCollection.find(query);
        const review = await cursor.toArray();
        res.send(review);
      });

      // REVIEW BY ID
      // app.get('/reviews', async(req, res)=>{
      //   console.log(req.query);
      //   let query = {};
      //   if(req.query.email){
      //     query = {
      //       email : req.query.email
      //     }
      //   }
      //   const cursor = reviewCollection.find(query);
      //   const review = await cursor.toArray();
      //   res.send(review);
      // });
      
      app.post('/reviews', async(req, res)=>{
        const review = req.body
        console.log(review)
        const result = await reviewCollection.insertOne(review)
        res.send(result)
      })






      app.put('/reviews/:id', async(req, res)=>{
        const id = req.params.id;
        const filter = {_id: ObjectId(id)};
        const review = req.body;
        const options = {upsert: true}
        const updatedReview = {
          $set: {
            message: review.name,
          }
        }
        const result = await reviewCollection.updateOne(filter, updatedReview, options);
        res.send(result);
      })

      app.delete('/review/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await reviewCollection.deleteOne(query)
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