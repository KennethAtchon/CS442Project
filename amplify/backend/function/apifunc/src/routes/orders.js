const express = require('express');

const connection = require('../dbconnect');

const app = express.Router();

app.post('/getorder', function(req, res) {
    const {orderId} = req.body;
  
    connection.query(
      'SELECT * FROM orders WHERE order_id = ?',
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

app.post('/getuserproducts', function(req, res) {
    const { userId } = req.body;
  
    // Construct the SQL query to select reviews for a product
    connection.query(
      'SELECT Product.* FROM orders '+
      ' INNER JOIN Order_Product ON orders.order_id = Order_Product.order_id ' +
      ' INNER JOIN Product ON Order_Product.product_id = Product.product_id ' +
      'WHERE orders.user_id = ?',
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

app.post('/getorderproduct', function (req, res) {
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
  

app.post('/orderproduct', function (req, res) {
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

app.post('/createorder', function (req, res) {
    const {  date, userId, total } = req.body; // Extract userId, date, and total from the request body
  
    // Construct the SQL INSERT query for creating an order
    let query = 'INSERT INTO orders SET ? ';
    var neworder;
  
    if(!userId){
      neworder = {
      order_date: date,
      total_price: total
      
    }
    }else{
      neworder = {
        order_date: date,
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