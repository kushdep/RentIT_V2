export const signup=async(req,res)=>{
    console.log(req.body)
}
export const login=async(req,res)=>{
    console.log(req.body)
}
export const sendOtp=async(req,res)=>{
    console.log(req.body)
    res.status(200).send({ message: "OTP sent successfully" });
}
