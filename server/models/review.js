import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    location: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    author: {
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        }
    },  
    ratings:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    bookingId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
},{ timestamps: { createdAt: 'createdAt' } })

const Review = mongoose.model('Review',reviewSchema)
export default Review
