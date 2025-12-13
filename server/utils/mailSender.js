import nodemailer from 'nodemailer';
import { google } from "googleapis"
import dotenv from 'dotenv'
dotenv.config()

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);


const mailSender = async (email, title, body) => {
  try {
    console.log("process.env.REFRESH_TOKEN")
    console.log(process.env.REFRESH_TOKEN)
    oAuth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });
    console.log(oAuth2Client.getAccessToken())
    const accessToken = await oAuth2Client.getAccessToken()
    console.log(accessToken)
    const transportBody = {
      service: 'gmail',   
      auth: {
        type: "OAuth2",
        user: process.env.USER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken?.token,
      }
    }
    console.log(transportBody)
    let transporter = nodemailer.createTransport(transportBody)
    console.log(transporter)
    const emailBody = {
      from: 'www.RentIt.co.in',
      to: email,
      subject: title,
      html: body,
    }
    let info = await transporter.sendMail(emailBody);
    console.log(info)
    return info;
  } catch (error) {
    console.log("Error in Mail Sender "+error.message);
  }
};

export default mailSender