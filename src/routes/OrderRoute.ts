import express from 'express';
import authAdmin from '../middlewares/adminAuth';
import { allOrders, updateStatus } from '../controller/orderController';
import authUser from '../middlewares/userAuth';

const orderRoute = express.Router();

orderRoute.post("/list",authAdmin,allOrders);
orderRoute.post("/status",authAdmin,updateStatus);




export default orderRoute;