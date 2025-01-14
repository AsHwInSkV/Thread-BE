import express from 'express';
import authUser from '../middlewares/userAuth';
import { getUserCart } from '../controller/cartController';
import { get } from 'http';

const cartRoute = express.Router();

cartRoute.post("/get",authUser,getUserCart);

export default cartRoute;