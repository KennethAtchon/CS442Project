const express = require('express');
const db = require('../dbconnect').promise();
const app = express.Router();

// Get Products Route
app.post('/getProducts', async (req, res) => {
    try {
        const {
            category,
            features,
            rating,
            price,
            description,
            name,
            product_id,
            supplier_name,
            supplier_address,
            delivery_speed
        } = req.body;

        let query = 'SELECT Products.*, Suppliers.* FROM Products';
        query += ' INNER JOIN Suppliers ON Products.supplier_id = Suppliers.supplier_id WHERE 1';

        const queryParams = [];

        if (typeof category !== 'undefined') {
            query += ' AND Products.category LIKE ?';
            queryParams.push('%' + category + '%');
        }

        if (typeof features !== 'undefined') {
            query += ' AND Products.features LIKE ?';
            queryParams.push('%' + features + '%');
        }

        if (typeof rating !== 'undefined') {
            query += ' AND Products.rating LIKE ?';
            queryParams.push('%' + rating + '%');
        }

        if (typeof price !== 'undefined') {
            query += ' AND Products.price LIKE ?';
            queryParams.push('%' + price + '%');
        }

        if (typeof description !== 'undefined') {
            query += ' AND Products.description LIKE ?';
            queryParams.push('%' + description + '%');
        }

        if (typeof name !== 'undefined') {
            query += ' AND Products.product_name LIKE ?';
            queryParams.push('%' + name + '%');
        }

        if (typeof product_id !== 'undefined') {
            query += ' AND Products.product_id LIKE ?';
            queryParams.push('%' + product_id + '%');
        }

        if (typeof supplier_name !== 'undefined') {
            query += ' AND Suppliers.supplier_name LIKE ?';
            queryParams.push('%' + supplier_name + '%');
        }

        if (typeof supplier_address !== 'undefined') {
            query += ' AND Suppliers.address LIKE ?';
            queryParams.push('%' + supplier_address + '%');
        }

        if (typeof delivery_speed !== 'undefined') {
            query += ' AND Suppliers.delivery_speed LIKE ?';
            queryParams.push('%' + delivery_speed + '%');
        }

        const [results] = await db.execute(query, queryParams);

        res.json({ products: results });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get User Products Route
app.post('/getUserProducts', async (req, res) => {
    try {
        const { userId } = req.body;

        const [results] = await db.execute(
            'SELECT DISTINCT Products.* FROM Orders ' +
            ' INNER JOIN Order_Product ON Orders.order_id = Order_Product.order_id ' +
            ' INNER JOIN Products ON Order_Product.product_id = Products.product_id ' +
            'WHERE Orders.user_id = ?',
            [userId]
        );

        res.json({ products: results });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get Home Products Route
app.post('/getHomeProducts', async (req, res) => {
    try {
        const sqlQuery = 'SELECT * FROM Products WHERE customData IS NOT NULL';

        const [results] = await db.execute(sqlQuery);

        res.json({ products: results });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = app;
