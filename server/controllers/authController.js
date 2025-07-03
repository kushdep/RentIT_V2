import otpGenerator from 'otp-generator'
import OTP from "../models/otp.js"

export const signup = async (req, res) => {
    console.log(req.body)
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
