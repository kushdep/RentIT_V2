import nodemailer from 'nodemailer';

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port:587,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
        });
    let info = await transporter.sendMail({
      from: 'www.RentIt.in - Deependra Kumar',
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};

export default mailSender