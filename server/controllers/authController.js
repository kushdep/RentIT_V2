import otpGenerator from 'otp-generator'
import OTP from "../models/otp.js"
import User from '../models/user.js'

export const signup = async (req, res) => {
    try {
        console.log(req.body)
        const { username, email, password, otp } = req.body
        if (!username || !email || !password || !otp) {
            return res.status(403).json({
                success: false,
                message: 'All fields are required',
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0 || otp !== response[0].otp) {
            return res.status(400).json({
                success: false,
                message: 'The OTP is not valid',
            });
        }
        const newUser = await User.create({
            username,
            email,
            password,
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
}

export const sendOtp = async (req, res) => {
    try {
        console.log(req.body)
        const { email } = req.body
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
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}
