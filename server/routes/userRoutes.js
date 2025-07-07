import express from "express";
import {login,signup,sendOtp,googleLogin} from '../controllers/authController.js'
import {validateUser} from "../middlewares/userValidation.js"
const router = express.Router()

router.post('/login',login)

router.get('/google',googleLogin)

router.post('/send-otp',sendOtp)

router.post('/signup',validateUser,signup)

export default router;