import mongoose, { Schema, Types } from "mongoose";

const paymentSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true
    },
    razorpay_payment_id: {
        type: String,
    },
    razorpay_order_id: {
        type: String,
    },
    amount: {
        type: Number,
        required: true
    },
    receiptNo: {
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum:['SUCCESS','PENDING','FAILED'],
        required: true
    }
}, { timestamps: true })

const Payment = mongoose.model('Payment', paymentSchema)
export default Payment