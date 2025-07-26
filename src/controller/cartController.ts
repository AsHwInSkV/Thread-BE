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

const addCartdata = async (req:Request,res:Response):Promise<void>=>{
    try{
        const {UserId,ItemId,size} = req.body;
        const userdata = await UserModel.findById(UserId);
        const cartdata = userdata?.cartdata || {};
       
        if(cartdata && cartdata[ItemId]){
            if(cartdata[ItemId][size]){
                cartdata[ItemId][size]+=1;
            }
            else{
                cartdata[ItemId][size]=1;
            }
        }
        else{
            cartdata[ItemId]={};
            cartdata[ItemId][size]=1;
        }
        await UserModel.findByIdAndUpdate(UserId,{cartdata});
        res.json({
            sucess:true,
            message:"Added to cart!"
        })
    }
    catch(error:unknown){
        const error_message=(error instanceof Error)?error.message:"An Unexpected Error Occured!";
        console.log(error);
        res.json({
            sucess:false,
            message:error_message
        });
    }
}

const updateCartdata = async (req:Request,res:Response):Promise<void>=>{
    try{
        const {UserId,ItemId,size,quantity}=req.body;
        let userData = await UserModel.findById(UserId);
        let cartdata = userData?.cartdata;
        if(cartdata){
            cartdata[ItemId][size]=quantity;
        }
        await UserModel.findByIdAndUpdate(UserId,{cartdata});
        res.json({
            sucess:true,
            message:"Cart Updated"
        })
    }
    catch(error:unknown){
        const error_message = (error instanceof Error)?error.message : "An Unexpected Error Occured!";
        console.log(error);
        res.json({
            sucess:false,
            message:error_message
        })
    }
}

export {getUserCart,addCartdata,updateCartdata};