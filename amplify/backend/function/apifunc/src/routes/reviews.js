const express = require('express');
const connection = require('../dbconnect');

const app = express.Router();

app.post('/createReview', function (req, res) {
    const { productId, userId, reviewText, rating, date } = req.body;
  
    // Construct the SQL query to insert or update a review
    connection.query('SELECT * FROM Reviews WHERE product_id = ? AND user_id = ?', [productId, userId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (results.length > 0) {
        // Review already exists, perform an UPDATE
        connection.query(
          'UPDATE Reviews SET comment = ?, rating = ?, review_date = ? WHERE product_id = ? AND user_id = ?',
          [reviewText, rating, date, productId, userId],
          (error, updateResults) => {
            if (error) {
              return res.status(500).json({ error: 'Database error' });
            }
            res.json({ message: 'Review updated successfully' });
          }
        );
      } else {
        // Review does not exist, perform an INSERT
        connection.query(
          'INSERT INTO Reviews (product_id, user_id, comment, rating, review_date) VALUES (?, ?, ?, ?, ?)',
          [productId, userId, reviewText, rating, date],
          (error, insertResults) => {
            if (error) {
              return res.status(500).json({ error: 'Database error' });
            }
            res.json({ message: 'Review created successfully', reviewId: insertResults.insertId });
          }
        );
      }
    });
    
  });

app.post('/getReviews', function (req, res) {
    const { productId } = req.body;
  
    // Construct the SQL query to select reviews for a product
    connection.query(
      'SELECT * FROM Reviews WHERE product_id = ?',
      [productId],
      (error, results) => {
        if (error) {
          return res.status(500).json({
            error: 'Database error', 
          });
        }
        res.json({ reviews: results });
      }
    );
  });

app.post('/getUserReviews', function (req, res) {
    const { userId } = req.body;
  
    // Construct the SQL query to select reviews for a product
    connection.query(
      'SELECT Reviews.*, Products.product_name FROM Reviews ' +
      'INNER JOIN Products ON Reviews.product_id = Products.product_id ' +
      'WHERE Reviews.user_id = ?',
      [userId],
      (error, results) => {
        if (error) {
          return res.status(500).json({
            error: 'Database error'
          });
        }
        res.json({ reviews: results });
      }
    );
  });

app.post('/checkReview', async function (req, res) {
    const { productId, userId } = req.body;
  
    try {
      // Query to check if the user has already reviewed the product
      const [reviewResults] = await connection.promise().query(
        'SELECT COUNT(*) AS reviewCount FROM Reviews WHERE product_id = ? AND user_id = ?',
        [productId, userId]
      );
  
      const hasReviewed = reviewResults[0].reviewCount > 0;
  
      if (hasReviewed) {
        res.json({ canReview: true }); 
        return;
      }
  
      // Query to check if the user has ordered the product
      const [orderResults] = await connection.promise().query(
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
      res.status(500).json({
        error: 'Database error'
      });
    }
  });
  

module.exports = app;