import { Resend } from 'resend';
import { verifyEmailTemplate } from '../templates/verifyEmailTemplate.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async(userEmail, otp) => {
    try {
        const {data, error} = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: userEmail,
            subject: "Verify your account",
            html: verifyEmailTemplate(otp),
        })

        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error("Email Error:", error);
        throw error;
    }
}