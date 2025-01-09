import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authAdmin = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const {token} = req.headers as unknown as {token:string};
    if(!token){
        res.json({success:false,message:"Not Authorized Login Again"});
    }
    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            res.json({sucess:false,message:"Invalid Credentials!"});
        }
        next();
    }
    catch(error : unknown){
        const error_message = (error instanceof Error)? error.message : "An Unexpected Error Occured!";
        console.log(error);
        res.json({
            sucess : false,
            message: error_message
        });
    }
   
}

export default authAdmin;