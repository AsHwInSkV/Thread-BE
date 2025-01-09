import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const authUser = async (req:Request,res:Response,next : NextFunction) : Promise<void>=>{
    const {token} = req.headers as { token: string };
    interface CustomJwtPayload extends JwtPayload {
        id: string;
      }
    if(!token){
        res.json({
            sucess:false,
            message : "Not Authorized! Login Again."
        });
    }
    try{
        const decode_token = jwt.verify(token,process.env.JWT_SECRET) as  CustomJwtPayload;
        req.body.UserId = decode_token.id;
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

export default authUser;