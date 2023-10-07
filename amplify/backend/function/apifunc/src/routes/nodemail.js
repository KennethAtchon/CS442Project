const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');

const connection = require('../dbconnect');
const secretKey = process.env.SECRET_KEY;

const app = express.Router();


/* EXAMPLE DELETE LATER */
/*
app.post('/forgot-password', async (req,res) => {
    
  const { email2 } = req.body;


  const user = await userModel.findOne({email: email2});

  if(!user)
  {
      App.mistakes.forgotMistake = "That email does not exist!"
      return res.redirect('/forgot-password');
  }
  

  const secret = JWT_SECRET + user.password;
  const payload = {
      email: user.email,
  }

  const token = jwt.sign(payload, secret, {expiresIn: '15m'});
  const link = `http://localhost:5000/reset-password/${user.email}/${token}`


  let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
      user: 'bugtracker89@hotmail.com', 
      pass: 'itbebugging78', 
      },
      tls:{
          rejectUnauthorized: false,
      }
  });

  try{

  let info = await transporter.sendMail({
      from: 'bugtracker89@hotmail.com', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Bug Tracker Reset Password", // Subject line
      text: `${link}`, // plain text body
      html: `<b>Here is the link to reset your password: ${link} 
      It expires in 15 minutes.</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  App.mistakes.forgotMistake = "Success! The link has been sent to your email!";
  res.redirect('/forgot-password')

  }catch(err){

      console.log(err);

      App.mistakes.forgotMistake = "Something went wrong sending the email!";
      return res.redirect('/forgot-password')
  }


}) */

/*behavior: create nodemailer, sendmail to the user with the link  */
app.post('/signPassword', function(req, res) {
    // Add your code here
    res.json({success: 'post call succeed!', url: req.url, body: req.body})
  });

  /*
  app.post('/reset-password/:useremail/:token', async (req,res) => {
    

    const { useremail, token } = req.params;

    const { password1 , password2} = req.body;


    const user = await userModel.findOne({email: useremail});

    if(!user)
    {
        
        return res.redirect('/forgot-password');
    }

    const secret = JWT_SECRET + user.password;

    try {    

        const payload = jwt.verify(token, secret);

        if(password1 != password2)
        {
            return res.redirect('/reset-password/:useremail/:token');
        }

        const hashedPsw = await bcrypt.hash(password1, 12);

        const response = await userModel.findOneAndUpdate(
            {
                email: user.email,
            },
            {
                $set: {
                    password: hashedPsw
                }
            }
        )

        App.mistakes.loginMistake = "";
        res.redirect('/login');

    }catch(err){

        console.log(err);
    }

})
  */

/* Behavior: given the params, and the passwords, must verify token,
 and email existance, once it does that compare passwords, then
 update password. */
app.post('/resetPassword/:email/:token', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/* relatively easy compared to reset password */
app.post('/sendOrderEmail', function(req, res) {
    // Add your code here
    res.json({success: 'post call succeed!', url: req.url, body: req.body})
  });

module.exports = app;




