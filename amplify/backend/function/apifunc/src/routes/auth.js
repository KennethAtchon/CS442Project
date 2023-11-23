const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');

const promisePool = require('../dbconnect').promise();
const secretKey = process.env.SECRET_KEY;

const app = express.Router();

app.post('/changeSettings', async function(req, res) {
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
      try {
        // First, fetch the hashed password from the database using promisePool
        const [results] = await promisePool.execute('SELECT password FROM User WHERE user_id = ?', [userId]);
  
        if (results.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        const storedPasswordHash = results[0].password;
  
        // Now, compare the current password with the stored hash
        const isPasswordMatch = await bcrypt.compare(currentpassword, storedPasswordHash);
  
        if (!isPasswordMatch) {
          return res.status(401).json({ error: 'Incorrect current password' });
        }
  
        // If the passwords match, hash and update the new password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        query += ' password = ?,';
        queryParams.push(hashedPassword);
  
      } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: error.message });
      }
    }
  
    // Remove the trailing comma and add WHERE clause to update the specific user
    query = query.slice(0, -1); // Remove the trailing comma
    query += ' WHERE user_id = ?';
    queryParams.push(userId);
  
    try {
      // Execute the query with parameters to update the user's settings using promisePool
      await promisePool.execute(query, queryParams);
      res.json({ message: 'Settings updated successfully' });
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: error.message });
    }
});

app.post('/signUp', async function (req, res) {
  const { name, email, password } = req.body;

  // Validate request data
  if (!email || !password || !name) {
    return res.status(400).json({
      error: 'Email, name, and password are required'
    });
  }

  try {
    // Check if a user with the given email already exists using promisePool
    const [results] = await promisePool.execute('SELECT * FROM User WHERE email = ?', [email]);

    if (results.length > 0) {
      return res.status(400).json({
        error: 'Email is already in use'
      });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

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

    // Insert the new user using promisePool
    await promisePool.execute('INSERT INTO User SET ?', newUser);

    // Fetch the newly created user from the database using promisePool
    const [createdUser] = await promisePool.execute('SELECT * FROM User WHERE email = ?', [email]);

    // Omit the "password" field from the user object in the results
    const userWithoutPassword = { ...createdUser[0] };
    delete userWithoutPassword.password;

    // Generate a JWT token and send it as part of the response
    jwt.sign({ user: userWithoutPassword }, secretKey, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        return res.status(500).json({ error: 'Error generating token' });
      }

      res.json({ token, user: userWithoutPassword });
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database error' });
  }
});

app.post('/signIn', async function (req, res) {
  const { email, password } = req.body;

  try {
    // Find the user with the matching email in the database using promisePool
    const [results] = await promisePool.execute('SELECT * FROM User WHERE email = ?', [email]);

    if (results.length === 0) {
      // User not found
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const user = results[0];

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Password doesn't match
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Omit the "password" field from the user object
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    // Generate a JWT token and send it as part of the response
    jwt.sign({ user: userWithoutPassword }, secretKey, { expiresIn: '1h' }, (jwtErr, token) => {
      if (jwtErr) {
        return res.status(500).json({ error: 'Error generating token' });
      }

      res.json({ token, user: userWithoutPassword });
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database error' });
  }
});

app.post('/signIntoken', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    // Verify the token using promisePool
    const decoded = jwt.verify(token, secretKey);

    // Fetch user details from the database using promisePool
    const [results] = await promisePool.execute('SELECT * FROM User WHERE email = ?', [decoded.user.email]);

    // Omit the "password" field from the user object in the results
    const userWithoutPassword = { ...results[0] };
    delete userWithoutPassword.password;

    // Send a response indicating successful sign-in
    res.json({ message: 'Sign-in with token successful', decoded: userWithoutPassword });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
});

app.post('/updateCart', async function (req, res) {
  const { userId, cart } = req.body;

  // Construct the SQL UPDATE query
  const query = 'UPDATE User SET cart = ? WHERE user_id = ?';

  try {
    // Execute the query with cart and userId as parameters using promisePool
    await promisePool.execute(query, [JSON.stringify(cart), userId]);
    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: error });
  }
});

module.exports = app;