import express from 'express'
import dotenv from 'dotenv'
import connection from './config/db.js';
import cors from 'cors';


dotenv.config()
const port = process.env.PORT;
const app = express();

app.use(cors());
connection();
app.get('/', (req,res)=>{
    res.send("API is running! ");
})

app.listen(port,()=>{
    console.log("Server started on port 5000");
})