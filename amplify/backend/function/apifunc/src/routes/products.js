const express = require('express');
const connection = require('../dbconnect');

const app = express.Router();


app.post('/getProducts', function(req,res){
    const { category, features, rating, price, description, name, 
      product_id, supplier_name, supplier_address, delivery_speed } = req.body;// Extract criteria from the request body
    
    // Construct the SQL query with conditional WHERE clauses for non-undefined criteria
    let query = 'SELECT Product.*, Supplier.*FROM Product';
    
    // Join with the Supplier table using the supplier_id foreign key
    query += ' INNER JOIN Supplier ON Product.supplier_id = Supplier.supplier_id WHERE 1';
    
    if (typeof category !== 'undefined') {
      query += ' AND Product.category = ?';
    }
    
    if (typeof features !== 'undefined') {
      query += ' AND Product.features = ?';
    }
    
    if (typeof rating !== 'undefined') {
      query += ' AND Product.rating = ?';
    }
    
    if (typeof price !== 'undefined') {
      query += ' AND Product.price = ?';
    }
    
    if (typeof description !== 'undefined') {
      query += ' AND Product.description = ?';
    }
    
    if (typeof name !== 'undefined') {
      query += ' AND Product.product_name = ?';
    }
    
    if (typeof product_id !== 'undefined') {
      query += ' AND Product.product_id = ?';
    }
    
    if (typeof supplier_name !== 'undefined') {
      query += ' AND Supplier.supplier_name = ?';
    }
    
    if (typeof supplier_address !== 'undefined') {
      query += ' AND Supplier.address = ?';
    }
    
    if (typeof delivery_speed !== 'undefined') {
      query += ' AND Supplier.delivery_speed = ?';
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


module.exports = app;