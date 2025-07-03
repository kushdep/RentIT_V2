import express from "express";
import {login,signup,sendOtp} from '../controllers/authController.js'
const router = express.Router()

router.get('/login',login)

router.post('/send-otp',sendOtp)

router.post('/signup',signup)

export default router;