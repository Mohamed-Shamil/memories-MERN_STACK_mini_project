import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from './routes/posts.js'

const app = express()


app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(cors())

app.use('/posts',postRoutes)

mongoose.connect('mongodb://localhost:27017/userdb',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => console.log('Connected to MongoDB...'))
.catch((err) => console.error('Could not connect to MongoDB...', err));

const db = mongoose.connection;

db.on("error",console.error.bind(console,"connection error"));
db.once("open",function(){
    console.log("connection successful")
})

app.listen(5000,()=>{
    console.log("Server running on port 5000")
})

