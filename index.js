const express=require('express')
const app=express();
const cors=require('cors');
require('dotenv').config();

const port=process.env.PORT || 5000;

// middlewear
const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
// app.use(cors())
app.use(express.json())
// app.use(cookieParser())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qrw2ki7.mongodb.net/?appName=Cluster0`;

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
 const photoCollection=client.db('photographyDB').collection("allPhotos")
// get all post
app.get('/post', async(req,res)=>{
    const result=await photoCollection.find().toArray()
    res.send(result)
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




app.get('/',(req,res)=>{
    res.send('still now photography')
})
app.listen(port,()=>{
    console.log(`photographer is stan in green city ${port}`)
})