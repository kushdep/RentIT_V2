import mongoose, { Schema, Types } from "mongoose";

const paymentSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        required:true
    },
    refId:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
},{timestamps:true})

const Payment = mongoose.model('Payment',paymentSchema)
export default Payment