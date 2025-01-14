import productModel from "../models/productModel";
import UserModel from "../models/userModel";
import { Request,Response } from "express";


const getUserCart = async (req:Request,res:Response):Promise<void>=>{
    interface RequestBody {
        UserId: string;
    }
    try{
        const {UserId} = req.body;
        const userData = await UserModel.findById(UserId);
        let cartdata = userData?.cartdata;
        res.json({
            sucess:true,
            cartdata
        })
    }
    catch(error:unknown){
        const error_message = (error instanceof Error)? error.message : "An Unexpected Error Occured!";
        console.log(error);
        res.json({
            sucess:false,
            message: error_message
        })
    }
};

export {getUserCart};