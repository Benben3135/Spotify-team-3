// terminal:
// npm install nodemailer crypto

//The crypto package in Node.js is a built-in module that provides Random Number Generation
import crypto from 'crypto';
//The nodemailer package is a popular Node.js library that allows you to send email from your Node.js applications.
import nodemailer from 'nodemailer';



async function handleRegister(ev:any) {
  try {
    debugger;
      ev.preventDefault();
      const name = ev.target.email.value; 
      const email = ev.target.email.value; 
      const password = ev.target.password.value;
      const user = {name, email, password};
      sendMail(email);
      openConfirmationTab()

     

      registerConfirmed(user);
  } catch (error) {
      console.error(error);   
  }
  
}


async function registerConfirmed(user){
  if(!user.email || !user.password) throw new Error("missing some details");
  const response = await fetch("API/users/register", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
  });
  const data = await response.json(); 
      

  console.log(data);  
  // go to Log in page   
  window.location.href = `LogIn.html`;
}




//this code is sending an email with a confirmation code to register the app:

function sendMail(email){
  //this function generates a random code:
function generateRandomCode(length: number): string {
  const bytes = crypto.randomBytes(Math.ceil(length / 2));
  const confirmation = bytes.toString('hex').slice(0, length)
  localStorage.setItem("confirmCode",confirmation );
  return confirmation;
}
// This line creates a transporter object that will be used to send email messages. The createTransport function is part of the nodemailer package
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'teamprojectmusic3@gmail.com',
    pass: 'MusicMaster3',
  },
});

// Generate a random confirmation code in the length of 6 digits:
const confirmationCode = generateRandomCode(6);

// Send an email with the confirmation code
const mailOptions = {
  from: 'teamprojectmusic3@gmail.com',
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
}

//this function opens the confirmation tab:
function openConfirmationTab(){
  
}








