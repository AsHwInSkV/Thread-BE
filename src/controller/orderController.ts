import { Request,Response } from "express";
import orderModel from "../models/orderModel";


const allOrders = async (req:Request,res:Response):Promise<void>=>{
    try{
        const orders = await orderModel.find({});
        res.json({
            sucess:true,
            orders
        });
    }
    catch(error:unknown){
        const error_message=(error instanceof Error)?error.message:"An Unexpected Error Occured!";
        console.log(error);
        res.json({
            sucess:false,
            message:error_message
        })
    }

}

const updateStatus = async (req:Request,res:Response):Promise<void>=>{
    const {OrderId,status} = req.body;
    await orderModel.findByIdAndUpdate(OrderId,{status});
    res.json({
        sucess:true,
        message:"Status Updated!"
    });
}

export {allOrders,updateStatus};