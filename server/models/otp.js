import mongoose from 'mongoose'
import mailSender from '../utils/mailSender.js'

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    console.log(email)
    console.log(otp)
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`
    );
    if (mailResponse === undefined || mailResponse === null) {
      return { sent: false, errorMessage: 'Unable to send Email' }
    }
    console.log("Email sent status: ", mailResponse);
    return { sent: true, message: 'Email sent successfully' }
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  if (this.isNew) {
    const {sent} = await sendVerificationEmail(this.email, this.otp);
    if(!sent){
      throw Error('Something Went Wrong')
    }
  }
  next();
});

const OTP = mongoose.model('OTP', otpSchema)
export default OTP

