import express from 'express';
import { Router } from 'express';
import authAdmin from '../middlewares/adminAuth';
import upload from '../middlewares/multer';
import { addProduct } from '../controller/productController';

const productRoute : Router = express.Router();

productRoute.post("/add",authAdmin,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addProduct);

export default productRoute;