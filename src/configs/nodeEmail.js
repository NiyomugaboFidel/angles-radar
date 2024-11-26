// mailer.js
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL, // your Gmail address
      pass: process.env.EMAIL_PASSWORD, // your Gmail password or App Password
    },
});

export default transporter;
