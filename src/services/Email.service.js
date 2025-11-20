import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
  
});


export const sendEmail = async (to, subject, html) => {
    try {
        const result = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        });
        console.log("Email enviado correctamente:", result.messageId);
        return result;
    } catch (error) {
        console.error("Error enviando email:", error); 
        return null;
    }
};
