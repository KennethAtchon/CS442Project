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
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;


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
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/signup', function (req, res) {
  // Extract user registration data from the request body
  const { username, email, password } = req.body;
  const user = {
    id: 1,
    username: username,
    email: email,
  };

  jwt.sign({ user }, secretKey, { expiresIn: '1h' }, (err, token) => {
    if (err) {
      return res.status(500).json({ error: 'Error generating token' });
    }

    // Send the token as part of the response
    res.json({ token, user });
  });
});


app.post('/signin', function(req, res) {
  const { email, password } = req.body; // Extract email and password from the request body

  if (email === 'example@example.com' && password === 'password123') {
    // Authentication successful
    const user = {
      id: 1,
      username: 'exampleUser',
      email: email
    };

    jwt.sign({ user }, secretKey, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        return res.status(500).json({ error: 'Error generating token' });
      }

      // Send the token as part of the response
      res.json({ token, user });
    });
  } else {
    // Authentication failed
    res.status(401).json({ error: 'Authentication failed' });
  }
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

    // If verification is successful, you can use the decoded data
    const user = decoded.user; // Assuming the token contains user data

    // Perform user authentication or session setup as needed

    // Send a response indicating successful sign-in
    res.json({ message: 'Sign-in with token successful', user });
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
