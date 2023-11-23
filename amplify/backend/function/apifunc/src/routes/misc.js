const express = require('express');
const db = require('../dbconnect').promise();

const app = express.Router();

app.get('/getFaq', async (req, res) => {
    try {
        // Construct the SQL query to select FAQ data
        const [results] = await db.execute('SELECT * FROM Faq');
        res.json({ faq: results });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/updateShipping', async (req, res) => {
    const { userId, shippingInfo, phoneNumber } = req.body;

    try {
        // Construct the SQL UPDATE query for shipping info
        const query = 'UPDATE User SET shipping_info = ?, phone_number = ? WHERE user_id = ?';
        await db.execute(query, [JSON.stringify(shippingInfo), phoneNumber, userId]);
        res.json({ message: 'Shipping info updated successfully' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: error });
    }
});

app.post('/updatePayment', async (req, res) => {
    const { userId, billingInfo, paymentInfo } = req.body;

    try {
        // Construct the SQL UPDATE query for payment info
        const query = 'UPDATE User SET billing_info = ?, payment_info = ? WHERE user_id = ?';
        await db.execute(query, [JSON.stringify(billingInfo), JSON.stringify(paymentInfo), userId]);
        res.json({ message: 'Payment info updated successfully' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: error });
    }
});

module.exports = app;
