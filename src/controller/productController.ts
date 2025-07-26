import { Request, Response } from 'express';
import {v2 as cloudinary} from 'cloudinary';
import 'dotenv/config';
import productModel from '../models/productModel';

const addProduct = async (req:Request,res:Response) : Promise<void>=>{
    interface productRequestBody{
        name : string;
        description : string;
        price : number;
        category : string;
        subCategory : string;
        sizes: string;
        bestSeller: string;
    };
    
    interface MulterFile {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
      };

      interface MulterFiles {
        image1?: MulterFile[];
        image2?: MulterFile[];
        image3?: MulterFile[];
        image4?: MulterFile[];
      }

    try{
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body as productRequestBody;
        console.log(req.body.description);
        const files = req.files as MulterFiles;

        const image1 = files.image1 && files.image1[0];
        const image2 = files.image2 && files.image2[0];
        const image3 = files.image3 && files.image3[0];
        const image4 = files.image4 && files.image4[0];

        const images = [image1,image2,image3,image4].filter((img)=>img!==undefined);
        
        const image_url :string[] = await Promise.all(
            images.map(async (pic)=>{
                let result = await cloudinary.uploader.upload(pic.path,{resource_type:"image"});
                return result.secure_url;
            })
        );

        const productData = {
            name : name,
            description :description,
            price :Number(price),
            category,
            subCategory,
            bestSeller : (bestSeller==="true")?true:false,
            sizes:JSON.parse(sizes),
            image: image_url,
            date:Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);

        await product.save();

        res.json({
            sucess : true,
            message: "Product Added"
        })

    }
    catch(error : unknown){
        const error_message = (error instanceof Error)? error.message : "An Unexpected Error Occured!";
        console.log(error);
        res.json({
            success : false,
            message : error_message
        });
    }
}

const removeProduct = async (req:Request,res:Response) : Promise<void>=>{
        try{
            await productModel.findByIdAndDelete(req.body.id);
            res.json({
                sucess:true,
                message: "Product deleted sucessfully!"
            });
        }
        catch(error:unknown){
            const error_message = (error instanceof Error)?error.message:"An unexpected error occured!"
            console.log(error)
            res.json({
                sucess:false,
                message:error_message
            })
        }
}

const singleProduct = async (req:Request,res:Response):Promise<void>=>{
    try{
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({
            sucess:true,
            product
        })
    }
    catch(error:unknown){
        const error_message = (error instanceof Error)? error.message : "An unexpected error occured!";
        console.log(error);
        res.json({
            sucess:false,
            message : error_message
        })
    }

    

};

const listProduct = async (req:Request,res:Response):Promise<void>=>{
    try{
        const products = await productModel.find({});
        res.json({
            sucess:true,
            products
        })
    }
    catch(error:unknown){
        const error_message=(error instanceof Error)? error.message : "An Unexpected Error Occured!"
        console.log(error);
        res.json({
            sucess:false,
            message:error_message
        })
    }

}

export {addProduct,removeProduct,singleProduct,listProduct}