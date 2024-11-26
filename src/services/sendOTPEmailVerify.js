import transporter from "../configs/nodeEmail.js";

async function sendEmailVerify(email, name, otp) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Email Verification OTP',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">Email Verification</h2>
        <p>Hello, ${name}</p>
        <p>Thank you for registering. Please use the following OTP to verify your email address:</p>
        <h3 style="color: #4CAF50;">${otp}</h3>
        <p>This OTP will expire in <strong>10 minutes</strong>.</p>
        <hr />
        <p>If you did not request this, please ignore this email.</p>
        <p>Best regards,<br>ANGELS - RADAR Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Failed to send verification email:", error);
  }
}

export default sendEmailVerify;
