const express = require('express');
const router = express.Router({ mergeParams: true });
const { body, validationResult } = require('express-validator');
const nodemailer = require("nodemailer");

// Nodemailer Setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

router.post('/api/sendotp', [
    body('email', 'Enter a valid email').isEmail()
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const email = req.body.email;
    const otp = generateOTP();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset Password OTP Code",
        text: `Your Reset Password OTP code is ${otp}. It is valid for 5 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.status(500).json({ message: "Error sending email", error });
        res.status(200).json({ message: "OTP sent successfully", otp }); // Send OTP to frontend
    });

});

module.exports = router;