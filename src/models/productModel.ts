import mongoose, { Model, Schema } from "mongoose";

interface Iproduct extends Document{
    name : string;
    description : string;
    price : number;
    image : string[];
    category : string;
    subCategory : string;
    sizes: string[];
    bestSeller: boolean;
    date : number;
}

const productSchema : Schema<Iproduct> = new mongoose.Schema({
    name: { type: String, required: true },
    description : {type:String, required : true},
    price: { type: Number, required: true },
    image: { type: [String], required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: [String], required: true },
    bestSeller: { type: Boolean, required: true },
    date: { type: Number, required: true }
})

const productModel : Model<Iproduct> = mongoose.models.product || mongoose.model<Iproduct>("product",productSchema);

export default productModel;

