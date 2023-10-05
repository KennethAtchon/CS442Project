const express = require('express');
const connection = require('../dbconnect');

const app = express.Router();


app.post('/getProducts', function(req,res){
    const { category, features, rating, price, description, name, 
      product_id, supplier_name, supplier_address, delivery_speed } = req.body;// Extract criteria from the request body
    
    // Construct the SQL query with conditional WHERE clauses for non-undefined criteria
    let query = 'SELECT Products.*, Suppliers.* FROM Products';
    
    // Join with the Supplier table using the supplier_id foreign key
    query += ' INNER JOIN Suppliers ON Products.supplier_id = Suppliers.supplier_id WHERE 1';
    
    if (typeof category !== 'undefined') {
      query += ' AND Products.category = ?';
    }
    
    if (typeof features !== 'undefined') {
      query += ' AND Products.features = ?';
    }
    
    if (typeof rating !== 'undefined') {
      query += ' AND Products.rating = ?';
    }
    
    if (typeof price !== 'undefined') {
      query += ' AND Products.price = ?';
    }
    
    if (typeof description !== 'undefined') {
      query += ' AND Products.description = ?';
    }
    
    if (typeof name !== 'undefined') {
      query += ' AND Products.product_name = ?';
    }
    
    if (typeof product_id !== 'undefined') {
      query += ' AND Products.product_id = ?';
    }
    
    if (typeof supplier_name !== 'undefined') {
      query += ' AND Suppliers.supplier_name = ?';
    }
    
    if (typeof supplier_address !== 'undefined') {
      query += ' AND Suppliers.address = ?';
    }
    
    if (typeof delivery_speed !== 'undefined') {
      query += ' AND Suppliers.delivery_speed = ?';
    }
    
      const queryParams = [category, features, rating, price, description, name,
         product_id, supplier_name, supplier_address, 
         delivery_speed].filter(value => typeof value !== 'undefined');
  
  
    // Execute the query with parameters
    connection.query(query, queryParams, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: err});
      }
  
      // Send the list of products as part of the response
      res.json({ products: results });
    });
  
  });

app.post('/getUserProducts', function(req, res) {
  const { userId } = req.body;

  // Construct the SQL query to select reviews for a product
  connection.query(
    'SELECT Product.* FROM Orders '+
    ' INNER JOIN Order_Product ON Orders.order_id = Order_Product.order_id ' +
    ' INNER JOIN Product ON Order_Product.product_id = Product.product_id ' +
    'WHERE Orders.user_id = ?',
    [userId],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          error: 'Database error'
        });
      }
      res.json({ products: results });
    }
  );
});


module.exports = app;