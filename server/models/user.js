import Joi from "joi";
import mongoose from "mongoose";

const UserSchema = Joi.object({
    username:Joi.string().min(3).max(30),
    email:Joi.string().email()
})

export default User = mongoose.model('User',UserSchema)

