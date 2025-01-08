import jwt from "jsonwebtoken";
import { Request, Response } from 'express';
import 'dotenv/config';
import UserModel from "../models/userModel";
import validator from 'validator';
import bcrypt from 'bcrypt';

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
const loginUser = async function(req :Request,res : Response) : Promise<void>{
        interface loginRequestBody{
            email : string;
            password : string;
        }
        interface IUser extends Document{
            name : string;
            email : string;
            password : string;
            cartdata : Record<string,any>;
        }
        
        try{
            const {email,password} = req.body as loginRequestBody;
            const user = await UserModel.findOne({email});
            if (!user){
                res.json({
                    sucess:false,
                    message : "User doesn't exists"
                });
            }else{
                const isMatch = await bcrypt.compare(password,user.password);
                if(isMatch){
                    const token = createToken(user._id as string);
                    res.json({
                        sucess:true,
                        token
                    });
                }
                else{
                    res.json({
                        sucess:false,
                        message:"Invalid Credentials"
                    })
                }
            }
            
        }
        catch(error : unknown){
            const error_message = (error instanceof Error) ? error.message : "An Unexpected Error Occured!";
            console.log(error);
            res.json({success:false,message : error_message});
        }
};
const registerUser = async function(req : Request, res : Response) : Promise<void>{
    interface registerBody{
        name:string;
        email:string;
        password:string;
    }
    try{
    const {name,email,password} = req.body as registerBody;

    const exists  = await UserModel.findOne({email});
    if(exists){
        res.json({success : false , message: "User already exists!"})
    }
    if(!validator.isEmail(email)){
        res.json({sucess : false , message : "Please enter a valid mail id"})
    }
    if(password.length<8){
        res.json({sucess : false , message : "Please enter a strong password"})
    }
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password,salt);
     const newUser = new UserModel({
        name,
        email,
        password:hashedPassword
     });

     const User = await newUser.save();

     const token = createToken(User._id as string | number);

     res.json({sucess : true , token});
     

}
catch(error : unknown){
    const error_message = (error instanceof Error) ? error.message : "An Unexpected Error Occured!";
    console.log(error);
    res.json({success:false,message : error_message});
}

};

export { adminlogin , loginUser, registerUser}