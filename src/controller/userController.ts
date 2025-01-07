import jwt from "jsonwebtoken";
import { Request, Response } from 'express';

const jwtSecret = process.env.JWT_SECRET;

if(!jwtSecret){
    throw new Error("JWT_SECRET is not defined in the environment variables");
}

const createToken = (id : string | number) : string=>{
    return jwt.sign({id},jwtSecret);
};

const adminlogin = async function(req :Request,res : Response) : Promise<void>{
    interface adminLoginRequestBody{
        email : string;
        password: string;
    }
    try{
        const { email, password} = req.body as adminLoginRequestBody;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token : string = jwt.sign(email+password,jwtSecret);
            res.status(200).json({success : true , token});
        }
        else{
            res.status(401).json({success : true,message : "Invalid credentials"});
        }
    }
    catch(error : unknown){
        const error_message = (error instanceof Error) ? error.message : "An Unexpected Error Occured!";
        console.log(error);
        res.json({success:false,message : error_message});
    }
};
const loginUser = function(){

};
const registerUser = function(){

};

export { adminlogin , loginUser, registerUser}