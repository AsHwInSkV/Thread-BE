import express from 'express';
import userRouter from "./routes/userRoute";
import 'dotenv/config';
import connectDB from './config/mongodbconnect';
import productRoute from './routes/productRouter';
import cloudinaryConnect from './config/cloudinary';
import cartRoute from './routes/cartRouter';
import orderRoute from './routes/OrderRoute';


const app = express();
const port:number = parseInt(process.env.port || "3000",10);

connectDB();
cloudinaryConnect();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/user',userRouter);
app.use('/api/product',productRoute);
app.use('/api/cart',cartRoute);
app.use("/api/order",orderRoute);

app.listen(3000);