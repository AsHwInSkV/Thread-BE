import jwt from "jsonwebtoken";
import { Request, Response } from 'express';

const jwtSecret = process.env.JWT_SECRET;

if(!jwtSecret){
    throw new Error("JWT_SECRET is not defined in the environment variables");
}

const createToken = (id : string | number) : string=>{
    return jwt.sign({id},jwtSecret);
};

const adminlogin = function(req :Request,res : Response) : void{

};
const loginUser = function(){

};
const registerUser = function(){

};

export { adminlogin , loginUser, registerUser}