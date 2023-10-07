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

    const payload = { email };

    const token = jwt.sign(payload, secretKey, {expiresIn: '15m'});
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
            to: `${email}`, // list of receivers
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
            res.json({error: err})

        }
  });


 app.post('/resetPassword/:email/:token', async function(req, res) {
    const { email, token } = req.params;
    const { password, confirmpassword } = req.body;
  
    try {
      // Verify the JWT token
      const payload = jwt.verify(token, secretKey);
  
      // Check if the email exists in the database
      const query = 'SELECT user_id FROM User WHERE email = ?';
      connection.query(query, [payload.email], async (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
  
        if (results.length === 0) {
          return res.status(401).json({ error: 'Email does not exist.' });
        }
  
        // Hash the new password
        const hashedPsw = await bcrypt.hash(password, 10);
  
        // Update the hashed password in the database
        const updateQuery = 'UPDATE User SET password = ? WHERE email = ?';
        connection.query(updateQuery, [hashedPsw, payload.email], (updateErr, updateResults) => {
          if (updateErr) {
            console.error('Database error:', updateErr);
            return res.status(500).json({ error: 'Database error' });
          }
  
          // Password updated successfully
          res.json({ success: 'Password updated successfully' });
        });
      });
    } catch (error) {
      // Handle JWT verification errors here
      console.error('JWT Verification Error:', error);
      res.status(401).json({ error: 'Invalid token' });
    }
  });
  
/* relatively easy compared to reset password */
app.post('/sendOrderEmail', function(req, res) {
    // Add your code here
    res.json({success: 'post call succeed!', url: req.url, body: req.body})
  });

module.exports = app;




