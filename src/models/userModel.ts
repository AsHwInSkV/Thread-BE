import mongoose, { Document, Schema, Model } from 'mongoose';

interface IUser extends Document{
    name : string;
    email : string;
    password : string;
    cartdata : Record<string,any>;
}

const UserSchema : Schema<IUser> = new mongoose.Schema({
    name : {type:String , required:true},
    email : {type:String, required:true, unique:true},
    password : {type : String ,required :true},
    cartdata : {type : Object, default: {}}
},{minimize : false});

const UserModel : Model<IUser>= mongoose.models.user || mongoose.model<IUser>('user',UserSchema);

export default UserModel;