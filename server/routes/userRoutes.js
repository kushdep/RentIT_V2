import express from "express";
import {login,signup,sendOtp,googleLogin} from '../controllers/authController.js'
import {validateUser} from "../middlewares/JoiValidations/userValidation.js"
import { contactUsValidation } from "../middlewares/JoiValidations/contactUsValidation.js";
import { setContactQuery } from "../controllers/otherControllers.js";
const router = express.Router()

router.post('/login',login)

router.get('/google',googleLogin)

router.post('/send-otp',sendOtp)

router.post('/signup',validateUser,signup)

router.post('/contact-us',contactUsValidation,setContactQuery)

export default router;