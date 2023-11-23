const express = require('express');
const db = require('../dbconnect').promise();
const app = express.Router();

// Get Order Route
app.post('/getOrder', async (req, res) => {
    try {
        const { orderId } = req.body;

        const [results] = await db.execute('SELECT * FROM Orders WHERE order_id = ?', [orderId]);

        res.json({ order: results });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get Order Product Route
app.post('/getOrderProduct', async (req, res) => {
    try {
        const { orderId } = req.body;

        const [results] = await db.execute(
            'SELECT OP.product_id, P.product_name ' +
            'FROM Order_Product AS OP ' +
            'INNER JOIN Products AS P ON OP.product_id = P.product_id ' +
            'WHERE OP.order_id = ?',
            [orderId]
        );

        res.json({ message: 'Order Product link sent', order: results });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Order Product Route
app.post('/orderProduct', async (req, res) => {
    try {
        const { orderid, cartItems } = req.body;

        for (const item of cartItems) {
            const query = 'INSERT INTO Order_Product SET ? ';

            const newOrder = {
                order_id: orderid,
                product_id: item.product_id,
                quantity: item.quantity,
            };

            await db.execute(query, newOrder);
        }

        res.json({ message: 'Order Product link created successfully' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Create Order Route
app.post('/createOrder', async (req, res) => {
    try {
        const { date, userId, total } = req.body;

        let query = 'INSERT INTO Orders SET ? ';
        let newOrder;

        if (!userId) {
            newOrder = {
                date: date,
                total_price: total,
            };
        } else {
            newOrder = {
                date: date,
                user_id: userId,
                total_price: total,
            };
        }

        const [results] = await db.execute(query, newOrder);

        res.json({ message: 'Order created successfully', results });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = app;
