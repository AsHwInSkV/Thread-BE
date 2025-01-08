import mongoose from "mongoose";
import 'dotenv/config';

const connectDB : ()=> Promise<void>  = async function () {
    mongoose.connection.on('connected',()=>{
        console.log('Database connected!');
    });
    await mongoose.connect(`${process.env.DATABASE_URI}?retryWrites=true&w=majority&appName=Cluster0/threads`);
}

export default connectDB;