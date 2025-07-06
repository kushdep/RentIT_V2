import express from "express";
import {login,signup,sendOtp} from '../controllers/authController.js'
import {validateUser} from "../middlewares/userValidation.js"
const router = express.Router()

router.post('/login',login)

router.post('/send-otp',sendOtp)

router.post('/signup',validateUser,signup)

export default router;