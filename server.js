const express = require("express");
// const { ObjectId } = require("mongodb")
const { MongoClient, ServerApiVersion } = require("mongodb")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())

const url = "mongodb+srv://luckypranav47:lucky647@cluster0.yo7ifvg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.get('/data',async(req,res)=>{
    try{
        const collection = client.db("ProductsData").collection('Products')
        const data = await collection.find({}).toArray();
        res.send(data);
    } catch(error){
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Error retrieving data' });
    }
})



app.listen(4000, async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully!');
        console.log("http://localhost:4000")
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
})
