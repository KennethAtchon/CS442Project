const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const nodemailer = require('nodemailer');

const db = require('../dbconnect').promise();
const secretKey = process.env.SECRET_KEY;

const app = express.Router();

app.post('/signPassword', async (req, res) => {
  try {
      const { email } = req.body;

      const [userResults] = await db.execute('SELECT user_id FROM User WHERE email = ?', [email]);

      if (userResults.length === 0) {
          // User not found
          return res.status(401).json({ error: 'Email does not exist.' });
      }

      const payload = { email };
      const token = jwt.sign(payload, secretKey, { expiresIn: '15m' });
      const link = `https://main.dcdome1e80r0l.amplifyapp.com/resetpassword/${email}/${token}`;

      const transporter = nodemailer.createTransport({
          host: 'smtp-mail.outlook.com',
          port: 587,
          secure: false,
          auth: {
              user: 'courtsidecart22@hotmail.com',
              pass: process.env.NODEMAILER_PASS,
          },
          tls: {
              rejectUnauthorized: false,
          },
      });

      const info = await transporter.sendMail({
          from: 'courtsidecart22@hotmail.com',
          to: email,
          subject: 'Courtside Cart Reset Password',
          text: link,
          html: `<b>Here is the link to reset your password: ${link} It expires in 15 minutes.</b>`,
      });

      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.json({ success: 'Message sent success' });
  } catch (err) {
      console.log(err);
      res.json({ error: err });
  }
});


app.post('/resetPassword/:email/:token', async (req, res) => {
  try {
      const { email, token } = req.params;
      const { password, confirmpassword } = req.body;

      // Verify the JWT token
      const payload = jwt.verify(token, secretKey);

      // Check if the email exists in the database
      const [results] = await db.execute('SELECT user_id FROM User WHERE email = ?', [payload.email]);

      if (results.length === 0) {
          return res.status(401).json({ error: 'Email does not exist.' });
      }

      // Hash the new password
      const hashedPsw = await bcrypt.hash(password, 10);

      // Update the hashed password in the database
      await db.execute('UPDATE User SET password = ? WHERE email = ?', [hashedPsw, payload.email]);

      // Password updated successfully
      res.json({ success: 'Password updated successfully' });
  } catch (error) {
      // Handle JWT verification errors here
      console.error('JWT Verification Error:', error);
      res.status(401).json({ error: 'Invalid token' });
  }
});

// Send Order Email Route
app.post('/sendOrderEmail', async (req, res) => {
  try {
      const { orderId, shippingData } = req.body;

      // Extract user_id from the order
      const [orderResults] = await db.execute('SELECT user_id FROM Orders WHERE order_id = ?', [orderId]);

      if (orderResults.length === 0) {
          return res.status(404).json({ error: 'Order not found' });
      }

      const user_id = orderResults[0].user_id;

      // Retrieve user's email from the User table
      const [userResults] = await db.execute('SELECT email FROM User WHERE user_id = ?', [user_id]);

      if (userResults.length === 0) {
          return res.status(404).json({ error: 'User not found' });
      }

      const userEmail = userResults[0].email;

      // Retrieve ordered products
      const [orderProductResults] = await db.execute(
          'SELECT OP.product_id, P.product_name ' +
          'FROM Order_Product AS OP ' +
          'INNER JOIN Products AS P ON OP.product_id = P.product_id ' +
          'WHERE OP.order_id = ?',
          [orderId]
      );

      const orderedProductsList = orderProductResults.map(product => product.product_name).join(', ');

      // Compose the email content
      const transporter = nodemailer.createTransport({
          host: 'smtp-mail.outlook.com',
          port: 587,
          secure: false,
          auth: {
              user: 'courtsidecart22@hotmail.com',
              pass: process.env.NODEMAILER_PASS,
          },
          tls: {
              rejectUnauthorized: false,
          },
      });

      const info = await transporter.sendMail({
          from: 'courtsidecart22@hotmail.com',
          to: userEmail,
          subject: 'Courtside Cart Order Success',
          text: 'Hello!',
          html: `<b>You have ordered some products: ${orderedProductsList}. The total is $${order[0].total_price}. We have sent the products to ${shippingData.streetAddress}, ${shippingData.city}, ${shippingData.state}, ${shippingData.zip}.</b>`,
      });

      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.json({ success: 'Message sent successfully' });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
  }
});

module.exports = app;




