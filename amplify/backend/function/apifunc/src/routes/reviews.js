const express = require('express');
const db = require('../dbconnect').promise();
const app = express.Router();

// Create Review Route
app.post('/createReview', async (req, res) => {
    try {
        const { productId, userId, reviewText, rating, date } = req.body;

        const [results] = await db.execute('SELECT * FROM Reviews WHERE product_id = ? AND user_id = ?', [productId, userId]);

        if (results.length > 0) {
            // Review already exists, perform an UPDATE
            await db.execute(
                'UPDATE Reviews SET comment = ?, rating = ?, review_date = ? WHERE product_id = ? AND user_id = ?',
                [reviewText, rating, date, productId, userId]
            );
            res.json({ message: 'Review updated successfully' });
        } else {
            // Review does not exist, perform an INSERT
            const [insertResults] = await db.execute(
                'INSERT INTO Reviews (product_id, user_id, comment, rating, review_date) VALUES (?, ?, ?, ?, ?)',
                [productId, userId, reviewText, rating, date]
            );
            res.json({ message: 'Review created successfully', reviewId: insertResults.insertId });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get Reviews Route
app.post('/getReviews', async (req, res) => {
    try {
        const { productId } = req.body;

        const productIdToUse = productId || null;
        const [results] = await db.execute(
            'SELECT Reviews.*, User.name AS user_name ' +
            'FROM Reviews ' + 
            ' INNER JOIN User ON Reviews.user_id = User.user_id ' +
            'WHERE Reviews.product_id = ?; ',
            [productIdToUse]
        );
        

        res.json({ reviews: results });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get User Reviews Route
app.post('/getUserReviews', async (req, res) => {
    try {
        const { userId } = req.body;

        const [results] = await db.execute(
            'SELECT Reviews.*, Products.product_name FROM Reviews ' +
            'INNER JOIN Products ON Reviews.product_id = Products.product_id ' +
            'WHERE Reviews.user_id = ?',
            [userId]
        );

        res.json({ reviews: results });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Check Review Route
app.post('/checkReview', async (req, res) => {
    try {
        const { productId, userId } = req.body;

        const [reviewResults] = await db.execute(
            'SELECT COUNT(*) AS reviewCount FROM Reviews WHERE product_id = ? AND user_id = ?',
            [productId, userId]
        );

        const hasReviewed = reviewResults[0].reviewCount > 0;

        if (hasReviewed) {
            res.json({ canReview: true });
            return;
        }

        const [orderResults] = await db.execute(
            'SELECT EXISTS (' +
            '  SELECT 1 FROM Orders ' +
            '  WHERE user_id = ? AND order_id IN (' +
            '    SELECT order_id FROM Order_Product WHERE product_id = ?' +
            '  )' +
            ') AS hasOrdered',
            [userId, productId]
        );

        const hasOrdered = orderResults[0].hasOrdered > 0;
        res.json({ canReview: hasOrdered });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = app;
