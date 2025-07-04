import nodemailer from 'nodemailer';
import { google } from "googleapis"

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);


const mailSender = async (email, title, body) => {
  try {
    oAuth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });
    const accessToken = await oAuth2Client.getAccessToken()
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
      from: 'www.RentIt.in - Deependra Kumar',
      to: email,
      subject: title,
      html: body,
    }
    console.log(emailBody)
    let info = await transporter.sendMail(emailBody);
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};

export default mailSender