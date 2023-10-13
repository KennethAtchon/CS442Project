const express = require('express');

const connection = require('../dbconnect');

const app = express.Router();

app.get('/getFaq', (req, res) => {
    // Construct the SQL query to select FAQ data
    connection.query(
      'SELECT * FROM Faq',
      (error, results) => {
        if (error) {
          return res.status(500).json({
            error: 'Database error'
          });
        }
        res.json({ faq: results });
      }
    );
  });

app.post('/updateShipping', function(req, res) {
    const { userId, shippingInfo, phoneNumber } = req.body; // Extract userId and shippingInfo from the request body

    // Construct the SQL UPDATE query for shipping info
    let query = 'UPDATE User SET shipping_info = ?, phone_number = ? WHERE user_id = ?';

    // Execute the query with shippingInfo and userId as parameters
    connection.query(query, [JSON.stringify(shippingInfo),phoneNumber, userId], (err, results) => {
        if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: err});
        }

        // Send a success response if the update is successful
        res.json({ message: 'Shipping info updated successfully' });
    });
});

app.post('/updatePayment', function(req, res) {
    const { userId, billingInfo, paymentInfo } = req.body; // Extract userId, billingInfo, and paymentInfo from the request body

    // Construct the SQL UPDATE query for payment info
    let query = 'UPDATE User SET billing_info = ?, payment_info = ? WHERE user_id = ?';

    // Execute the query with billingInfo, paymentInfo, and userId as parameters
    connection.query(query, [JSON.stringify(billingInfo), JSON.stringify(paymentInfo), userId], (err, results) => {
        if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: err});
        }

        // Send a success response if the update is successful
        res.json({ message: 'Payment info updated successfully' });
    });
});


module.exports = app;