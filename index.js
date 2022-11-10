const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const token = jwt.sign({ foo: 'bar' }, '9690918162653d5395551d2e5fdf7d3255505848ac0254014adc26d29887fcafc61718a988a2fcd3ffb8beed815732414ebe6936df795c5ab14c0b9d47a37945');
const { MongoClient, ServerApiVersion, Collection, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000


//middle ware
app.use(cors())
app.use(express.json())
   
//user: dbuserassig
//password: Pcmb5QZVboNCvCAv   

   
const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.DB_PASSWORD}@cluster0.nyumefd.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
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
      app.post('/services', async(req, res)=>{
        const service = req.body
        console.log(service)
        const result = await serviceCollection.insertOne(service)
        res.send(result)
      })
      // JWT
      // app.post('/jwt', async(req, res)=>{
      //   const user = req.body
      //   console.log(user)
      //   const token = jwt.sign(user, '9690918162653d5395551d2e5fdf7d3255505848ac0254014adc26d29887fcafc61718a988a2fcd3ffb8beed815732414ebe6936df795c5ab14c0b9d47a37945' )
      //   res.send({token})
      //   
      // })


      
      // REVIEWS
      app.post('/reviews', async(req, res)=>{
        const review = req.body
        console.log(review)
        const result = await reviewCollection.insertOne(review)
        res.send(result)
      })
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
      app.get('/reviews/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const review = await reviewCollection.findOne(query);
        res.send(review);

      })
      app.put('/reviews/:id', async(req, res)=>{
        const id = req.params.id;
        const filter = {_id: ObjectId(id)};
        const review = req.body;
        const options = {upsert: true}
        const updatedReview = {
          $set: {
            message: review.message
          }
        }
        const result = await reviewCollection.updateOne(filter, updatedReview, options);
        res.send(result);
      })
      app.delete('/reviews/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await reviewCollection.deleteOne(query)
        console.log(result);
        res.send(result)
      })
      






      // app.put('/reviews/:id', async(req, res)=>{
      //   const id = req.params.id;
      //   const filter = {_id: ObjectId(id)};
      //   const review = req.body;
      //   const options = {upsert: true}
      //   const updatedReview = {
      //     $set: {
      //       message: review.name,
      //     }
      //   }
      //   const result = await reviewCollection.updateOne(filter, updatedReview, options);
      //   res.send(result);
      // })

      
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