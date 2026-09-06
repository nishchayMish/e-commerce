import nodemailer from "nodemailer"
import { ResetPasswordTemplate, verifyEmailTemplate } from '../templates/verifyEmailTemplate.js';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (userEmail, otp, subject) => {
  try {
    let html;

    switch (subject) {
      case "Verify your account":
        html = verifyEmailTemplate(otp);
        break;

      case "Reset your password":
        html = ResetPasswordTemplate(otp);
        break;

      default:
        throw new Error("Invalid email subject");
    }

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: userEmail,
      subject,
      html,
    });

    return info;
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};
