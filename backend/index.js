import express from 'express'
import dotenv from 'dotenv'
import connection from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import cors from 'cors';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';

dotenv.config()
const port = process.env.PORT;
const app = express();

app.use(cors());
connection();

app.get('/', (req,res)=>{
    res.send("API is running! ");
})

app.use('/api/products',productRoutes);

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{
    console.log("Server started on port 5000");
})