const express = require('express');

const connection = require('../dbconnect');

const app = express.Router();

app.post('/getOrder', function(req, res) {
    const {orderId} = req.body;
  
    connection.query(
      'SELECT * FROM Orders WHERE order_id = ?',
      orderId,
      (error, results) => {
        if (error) {
          return res.status(500).json({
            error: 'Database error '
          });
        }
        res.json({ order: results})
      })
    
  
  });

app.post('/getOrderProduct', function (req, res) {
    const { orderId } = req.body; 
  
    // Construct the SQL query to select product_id and product_name using a JOIN
    connection.query(
      'SELECT OP.product_id, P.product_name ' +
      'FROM Order_Product AS OP ' +
      'INNER JOIN Product AS P ON OP.product_id = P.product_id ' +
      'WHERE OP.order_id = ?',
      orderId,
      (error, results) => {
        if (error) {
          return res.status(500).json({
            error: 'Database error'
          });
        }
        res.json({ message: 'Order Product link sent', order: results });
      }
    );
  });
  

app.post('/orderProduct', function (req, res) {
    const {  orderid, cartItems } = req.body; // Extract userId, date, and total from the request body
  
    // Construct the SQL INSERT query for creating an order
    
  
    for (const item of cartItems) {
      let query = 'INSERT INTO Order_Product SET ? ';
  
      const neworder = {
      order_id: orderid,
      product_id: item.product_id,
      quantity: item.quantity
      }
  
      connection.query(query, neworder, (err, results) => {
        if (err) {
          console.error('Database error:', err);
          res.status(500).json({ error: err });
          } 
        })
  
    }
  
    res.json({ message: 'Order Product link created successfully' });
    
  
    
  });

app.post('/createOrder', function (req, res) {
    const {  date, userId, total } = req.body; // Extract userId, date, and total from the request body
  
    // Construct the SQL INSERT query for creating an order
    let query = 'INSERT INTO Orders SET ? ';
    var neworder;
  
    if(!userId){
      neworder = {
      date: date,
      total_price: total
      
    }
    }else{
      neworder = {
        date: date,
        user_id: userId,
        total_price: total
      }
  
    }
    
    // Execute the query with userId, date, and total as parameters
    connection.query(query, neworder, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: err });
      } else {
        // Send a success response if the order creation is successful
        res.json({ message: 'Order created successfully', results });
      }
    });
  });

module.exports = app;