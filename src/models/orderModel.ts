import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    UserId : {type:String,required:true},
    ItemId:{type:String,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,required:true,default:"Order Placed"},
    paymentMethod:{type:String,require:true},
    payment:{type:Boolean,required:true},
    date:{type:Number,required:true}
});

const orderModel = mongoose.models.order || mongoose.model('order',orderSchema);

export default orderModel;