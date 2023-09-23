// terminal:
// npm install nodemailer crypto

//The crypto package in Node.js is a built-in module that provides Random Number Generation
import crypto from 'crypto';
//The nodemailer package is a popular Node.js library that allows you to send email from your Node.js applications.
import nodemailer from 'nodemailer';

//this function generates a random code:
function generateRandomCode(length: number): string {
    const bytes = crypto.randomBytes(Math.ceil(length / 2));
    return bytes.toString('hex').slice(0, length);
  }
//this code is sending an email with a confirmation code to register the app:

// This line creates a transporter object that will be used to send email messages. The createTransport function is part of the nodemailer package
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'our project email',
      pass: 'our project email Password',
    },
  });
  
  // Generate a random confirmation code in the length of 6 digits:
  const confirmationCode = generateRandomCode(6);
  
  // Send an email with the confirmation code
  const mailOptions = {
    from: 'our project email',
    to: `users email: ${email}`,
    subject: 'Confirmation Code for App Registration',
    text: `Your confirmation code is: ${confirmationCode}`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });