import express from 'express';
import userRouter from "./routes/userRoute";
import 'dotenv/config';
import connectDB from './config/mongodbconnect';


const app = express();
const port:number = parseInt(process.env.port || "3000",10);

connectDB();

app.use(express.json());

app.use('/api/user',userRouter);

app.listen(port);