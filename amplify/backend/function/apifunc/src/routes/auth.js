const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');

const connection = require('../dbconnect');
const secretKey = process.env.SECRET_KEY;

const app = express.Router();

app.post('/changeSettings', function(req, res) {
    const { userId, name, email, currentpassword, password } = req.body;
  
    // Construct the SQL query to update User table with the given parameters
    let query = 'UPDATE User SET ';
  
    const queryParams = [];
  
    if (typeof name !== 'undefined') {
      query += ' name = ?,';
      queryParams.push(name);
    }
  
    if (typeof email !== 'undefined') {
      query += ' email = ?,';
      queryParams.push(email);
    }
  
    if (typeof currentpassword !== 'undefined' && typeof password !== 'undefined') {
      // First, fetch the hashed password from the database
      connection.query('SELECT password FROM User WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: err.message }); // Send the actual error message
        }
  
        if (results.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        const storedPasswordHash = results[0].password;
  
        // Now, compare the current password with the stored hash
        bcrypt.compare(currentpassword, storedPasswordHash, (compareError, isPasswordMatch) => {
          if (compareError) {
            return res.status(500).json({ error: compareError.message }); // Send the actual error message
          }
  
          if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Incorrect current password' });
          }
  
          // If the passwords match, hash and update the new password
          bcrypt.hash(password, 10, (hashError, hashedPassword) => {
            if (hashError) {
              return res.status(500).json({
                error: hashError.message // Send the actual error message
              });
            }
  
            query += ' password = ?,';
            queryParams.push(hashedPassword);
  
            // Remove the trailing comma and add WHERE clause to update the specific user
            query = query.slice(0, -1); // Remove the trailing comma
            query += ' WHERE user_id = ?';
            queryParams.push(userId);
  
            // Execute the query with parameters to update the user's settings
            connection.query(query, queryParams, (updateError, result) => {
              if (updateError) {
                console.error('Database error:', updateError);
                return res.status(500).json({ error: updateError.message }); // Send the actual error message
              }
  
              res.json({ message: 'Settings updated successfully' });
            });
          });
        });
      });
    } else {
  
      query = query.slice(0, -1); // Remove the trailing comma
      query += ' WHERE user_id = ?';
      queryParams.push(userId);
  
      // Execute the query with parameters to update the user's settings
      connection.query(query, queryParams, (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: err.message }); // Send the actual error message
        }
  
        res.json({ message: 'Settings updated successfully' });
      });
    }
  });
  

app.post('/signUp', function (req, res) {
  
    // Extract user registration data from the request body
    const { name, email, password } = req.body;
  
    // Validate request data
    if (!email || !password || !name) {
      return res.status(400).json({
        error: 'Email, name, and password are required'
      });
    }
  
    // Check if a user with the given email already exists
    connection.query(
      'SELECT * FROM User WHERE email = ?',
      [email],
      (error, results) => {
        if (error) {
          return res.status(500).json({
            error: 'Database error while checking for existing user'
          });
        }
  
        if (results.length > 0) {
          return res.status(400).json({
            error: 'Email is already in use'
          });
        }
      })
  
    // Hash the user's password
    bcrypt.hash(password, 10, (hashError, hashedPassword) => {
      if (hashError) {
        return res.status(500).json({
          error: 'Error hashing password'
        });
      }
  
      // Create a new user
      const newUser = {
        name,
        email,
        password: hashedPassword, 
        cart: JSON.stringify([]),
        payment_info: JSON.stringify({}), 
        phone_number: '', 
        shipping_info: JSON.stringify({}),
        billing_info: JSON.stringify({})
      };
  
      connection.query(
        'INSERT INTO User SET ?',
        newUser,
        (insertError) => {
          if (insertError) {
            return res.status(500).json({
              error: 'Error creating a new user'
            });
          }
        })
  
      const query = 'SELECT * FROM User WHERE email = ?';
  
      connection.query(query, [email], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      jwt.sign({ user: results }, secretKey, { expiresIn: '1h' }, (err, token) => {
            if (err) {
              return res.status(500).json({ error: 'Error generating token' });
            }
  
            // Send the token as part of the response
            res.json({ token, user: results });
          });
  
        })
    });
  });
  


app.post('/signIn', function (req, res) {
    const { email, password } = req.body; // Extract email and password from the request body
  
    // Find the user with the matching email in the database
    const query = 'SELECT * FROM User WHERE email = ?';
    connection.query(query, [email], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      if (results.length === 0) {
        // User not found
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      const user = results[0];
  
      // Compare the provided password with the stored hashed password
      bcrypt.compare(password, user.password, (compareErr, passwordMatch) => {
        if (compareErr || !passwordMatch) {
          // Password doesn't match or error occurred
          return res.status(401).json({ error: 'Authentication failed' });
        }
  
  
        // Generate a JWT (JSON Web Token) for the user
        jwt.sign({ user: user }, secretKey, { expiresIn: '1h' }, (jwtErr, token) => {
          if (jwtErr) {
            return res.status(500).json({ error: 'Error generating token' });
          }
  
          // Send the token as part of the response
          res.json({ token, user: user });
        });
      });
    });
  });

app.post('/signIntoken', (req, res) => {
    const { token } = req.body;
  
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      // Send a response indicating successful sign-in
      res.json({ message: 'Sign-in with token successful', decoded });
    });
  });

app.post('/updateCart', function(req, res) {
  const { userId, cart } = req.body; // Extract userId and cart from the request body

  // Construct the SQL UPDATE query
  let query = 'UPDATE User SET cart = ? WHERE user_id = ?';

  // Execute the query with cart and userId as parameters
  connection.query(query, [JSON.stringify(cart), userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: err});
    }

    // Send a success response if the update is successful
    res.json({ message: 'Cart updated successfully' });
  });
});
  
module.exports = app;