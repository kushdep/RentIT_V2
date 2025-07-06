import otpGenerator from 'otp-generator'
import OTP from "../models/otp.js"
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    try {
        const { username, email, password, otp } = req.body
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0 || otp !== response[0].otp) {
            return res.status(400).send({
                success: false,
                message: 'The OTP is not valid',
            });
        }
        let hashPassword
        try {
            hashPassword = await bcrypt.hash(password, 10)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, error: error.message });
        }
        const newUser = await User.create({
            username,
            email,
            password: hashPassword,
        })
        return res.status(201).json({
            success: true,
            message: 'User Registered Successfully',
            user: newUser
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const login = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).send({
            success: false,
            message: 'All feilds are required'
        })
    }
    const user = await User.findOne({ email })
    console.log(user)
    if (!user) {
        res.status(401).send({
            success: false,
            message: 'User do not exist'
        })
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        res.status(402).send({
            success:false,
            message:'Email or password incorrect'
        })
    }
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
    res.header('auth-token',token).send(token)
}

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'User already exist'
            })
        }
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        const otpPayload = { email, otp }
        await OTP.create(otpPayload)
        res.status(200).send({
            success: true,
            message: "OTP sent successfully"
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
