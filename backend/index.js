import express from 'express'
import dotenv from 'dotenv'
import connection from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';

dotenv.config()
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(cookieParser());
connection();

app.get('/', (req,res)=>{
    res.send("API is running! ");
})

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{
    console.log("Server started on port 5000");
})