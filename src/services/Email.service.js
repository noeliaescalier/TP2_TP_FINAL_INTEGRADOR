import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail", 
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
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