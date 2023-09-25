/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');



// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

const connection = mysql.createConnection({
  host: process.env.SECRET_HOST,
  user: process.env.SECRET_USER,
  password: process.env.SECRET_SQLPASS,
  database: process.env.SECRET_USER,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});


const secretKey = process.env.SECRET_KEY;

/**********************
 * Example get method *
 **********************/

app.get('/', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});


app.get('/server', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/server/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/', function(req, res) {
  // Add your code here
  //res.json({success: 'post call succeed!', url: req.url, body: req.body})


});

app.post('/signup', function (req, res) {
  
  // Extract user registration data from the request body
  const { username, email, password } = req.body;

  // Validate request data
  if (!email || !password || !username) {
    return res.status(400).json({
      error: 'Email, username, and password are required'
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
      username,
      email,
      password: hashedPassword, // Store the hashed password
      cart: JSON.stringify([]), // Initialize the cart as an empty array
      payment_info: JSON.stringify({}), // Initialize payment_info as an empty object
      phone_number: '', // Initialize phone_number as an empty string
      shipping_info: JSON.stringify({}) // Initialize shipping_info as an empty object
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


    jwt.sign({ user: newUser }, secretKey, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        return res.status(500).json({ error: 'Error generating token' });
      }

      // Send the token as part of the response
      res.json({ token, user });
    });
  });
});


app.post('/signin', function (req, res) {
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
        res.json({ token, user: userWithoutPassword });
      });
    });
  });
});

app.post('/signintoken', (req, res) => {
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


app.post('/server/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/server/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/server/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
