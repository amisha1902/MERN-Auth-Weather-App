const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: "Verify Your Email",
            html: `<h2>Email Verification</h2>
                <p>Click the link below to verify your email:</p>
                <a href="${process.env.FRONTEND_URL}/verify/${token}">Verify Email</a>`,
        };

        await transporter.sendMail(mailOptions);
        console.log("📧 Verification email sent");
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};

module.exports = sendVerificationEmail;
