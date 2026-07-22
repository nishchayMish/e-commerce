import { Resend } from 'resend';
import { ResetPasswordTemplate, verifyEmailTemplate } from '../templates/verifyEmailTemplate.js';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: userEmail,
      subject,
      html,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};