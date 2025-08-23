import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    locations: {
        categories: {
            Appartment: [{
                type: mongoose.Types.ObjectId,
                ref:'Location'
            }],
            Villa: [{
                type: mongoose.Types.ObjectId,
                ref:'Location'
            }],
            Penthouse: [{
                type: mongoose.Types.ObjectId,
                ref:'Location'
            }]
        }
    },
    savedLoc:[{
        type: mongoose.Types.ObjectId,
        ref:'Location'
    }]
}, { timestamps: { createdAt: 'createdAt' } })


const User = mongoose.model('User', userSchema)
export default User

