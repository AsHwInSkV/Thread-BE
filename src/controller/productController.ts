import { Request, Response } from 'express';

const addProduct = async (req:Request,res:Response) : Promise<void>=>{
    interface productRequestBody{
        name : string;
        description : string;
        price : number;
        image : string[];
        category : string;
        subCategory : string;
        sizes: string[];
        bestSeller: boolean;
        date : number;
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

        const files = req.files as MulterFiles;

        const image1 = files.image1 && files.image1[0];
        const image2 = files.image2 && files.image2[0];
        const image3 = files.image3 && files.image3[0];
        const image4 = files.image4 && files.image4[0];

        const images = [image1,image2,image3,image4].filter((img)=>img!==undefined);


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

export {addProduct}