const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const nodemailer = require('nodemailer');

const connection = require('../dbconnect');
const secretKey = process.env.SECRET_KEY;

const app = express.Router();

app.post('/signPassword', async function(req, res) {
    const { email } = req.body;

    const query = 'SELECT user_id FROM User WHERE email = ?';
    connection.query(query, [email], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      if (results.length === 0) {
        // User not found
        return res.status(401).json({ error: 'Email does not exist.' });
      }
    })

    const token = jwt.sign(email, secretKey, {expiresIn: '15m'});
    const link = `https://main.dcdome1e80r0l.amplifyapp.com/${email}/${token}`

    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: 'courtsidecart22@hotmail.com', 
        pass: process.env.NODEMAILER_PASS, 
        },
        tls:{
            rejectUnauthorized: false,
        }
    });

    try{

        let info = await transporter.sendMail({
            from: 'courtsidecart22@hotmail.com', // sender address
            to: `${user.email}`, // list of receivers
            subject: "Courtside Cart Reset Password", // Subject line
            text: `${link}`, // plain text body
            html: `<b>Here is the link to reset your password: ${link} 
            It expires in 15 minutes.</b>`, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.json({success: 'Message sent success'});
      
        
      
        }catch(err){
      
            console.log(err);
            res.json({success: 'Message failed'})

        }
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




