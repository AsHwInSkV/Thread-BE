import express from 'express';
import userRouter from "./src/routes/userRoute";



const app = express();
const port:number = parseInt(process.env.port || "3000",10);

app.use(express.json());

app.use('/api/user',userRouter);

app.listen(port);