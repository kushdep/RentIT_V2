import Joi from "joi";
import mongoose from "mongoose";

const userSchema = Joi.object({
    username:Joi.string().min(3).max(30).required(),
    email:Joi.string().email().required(),
    password:Joi.string().required()
})


const User = mongoose.model('User',userSchema)
export default User

