import express from "express";
import { adminlogin, loginUser, registerUser } from "../controller/userController";
import { Router } from "express";
import authAdmin from "../middlewares/adminAuth";

const userRouter : Router = express.Router();


userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/admin',adminlogin);

export default userRouter;