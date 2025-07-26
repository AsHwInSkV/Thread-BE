import express from 'express';
import authUser from '../middlewares/userAuth';
import { addCartdata, getUserCart, updateCartdata } from '../controller/cartController';
import { get } from 'http';

const cartRoute = express.Router();

cartRoute.post("/get",authUser,getUserCart);
cartRoute.post("/add",authUser,addCartdata);
cartRoute.post("/update",authUser,updateCartdata);

export default cartRoute;