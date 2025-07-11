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
            Appartment: {
                type: mongoose.Types.ObjectId,
                ref: 'Appartment'
            },
            Villa: {
                type: mongoose.Types.ObjectId,
                ref: 'Vila'
            },
            Penthouse: {
                type: mongoose.Types.ObjectId,
                ref: 'Penthouse'
            }
        }
    }
})


const User = mongoose.model('User', userSchema)
export default User

