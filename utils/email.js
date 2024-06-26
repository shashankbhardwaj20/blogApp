const nodemailer = require('nodemailer');
require("dotenv").config;


async function sendOtpEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.emailId,
            pass: process.env.password
        }
    });

    const mailOptions = {
        from: process.env.emailId,
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP code is ${otp}`
    };
    try{
        const result  = await transporter.sendMail(mailOptions);
    }
    catch(err){
        console.log("err",err);
    }
}

module.exports = {sendOtpEmail };
