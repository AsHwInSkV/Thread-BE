import express from "express";
import { adminlogin, loginUser, registerUser } from "../controller/userController";
import { Router } from "express";
import upload from "../middlewares/multer";

const userRouter : Router = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/admin',adminlogin);

export default userRouter;