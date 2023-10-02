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
const bcrypt = require('bcryptjs');



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
  connectTimeout: 20000,
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

app.get('/getfaq', (req, res) => {
  // Construct the SQL query to select FAQ data
  connection.query(
    'SELECT * FROM FAQ',
    (error, results) => {
      if (error) {
        return res.status(500).json({
          error: 'Database error'
        });
      }
      res.json({ faq: results });
    }
  );
});


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

/****************************
* Example post method *
****************************/

app.post('/', function(req, res) {
  // Add your code here
  //res.json({success: 'post call succeed!', url: req.url, body: req.body})


});


app.post('/createreview', function (req, res) {
  const { productId, userId, reviewText, rating, date } = req.body;

  // Construct the SQL query to insert or update a review
  connection.query('SELECT * FROM Review WHERE product_id = ? AND user_id = ?', [productId, userId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (results.length > 0) {
      // Review already exists, perform an UPDATE
      connection.query(
        'UPDATE Review SET comment = ?, rating = ?, review_datetime = ? WHERE product_id = ? AND user_id = ?',
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
        'INSERT INTO Review (product_id, user_id, comment, rating, review_datetime) VALUES (?, ?, ?, ?, ?)',
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


// include review name in db
app.post('/getreviews', function (req, res) {
  const { productId } = req.body;

  // Construct the SQL query to select reviews for a product
  connection.query(
    'SELECT * FROM Review WHERE product_id = ?',
    [productId],
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

app.post('/getuserreviews', function (req, res) {
  const { userId } = req.body;

  // Construct the SQL query to select reviews for a product
  connection.query(
    'SELECT Review.*, Product.product_name FROM Review ' +
    'INNER JOIN Product ON Review.product_id = Product.product_id ' +
    'WHERE Review.user_id = ?',
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

app.post('/checkreview', async function (req, res) {
  const { productId, userId } = req.body;

  try {
    // Query to check if the user has already reviewed the product
    const [reviewResults] = await connection.promise().query(
      'SELECT COUNT(*) AS reviewCount FROM Review WHERE product_id = ? AND user_id = ?',
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
      '  SELECT 1 FROM orders ' +
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

app.post('/updatecart', function(req, res) {
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

app.post('/updateshipping', function(req, res) {
  const { userId, shippingInfo } = req.body; // Extract userId and shippingInfo from the request body

  // Construct the SQL UPDATE query for shipping info
  let query = 'UPDATE User SET shipping_info = ? WHERE user_id = ?';

  // Execute the query with shippingInfo and userId as parameters
  connection.query(query, [JSON.stringify(shippingInfo), userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err});
    }

    // Send a success response if the update is successful
    res.json({ message: 'Shipping info updated successfully' });
  });
});

app.post('/updatepayment', function(req, res) {
  const { userId, billingInfo, paymentInfo } = req.body; // Extract userId, billingInfo, and paymentInfo from the request body

  // Construct the SQL UPDATE query for payment info
  let query = 'UPDATE User SET billing_info = ? AND payment_info = ? WHERE user_id = ?';

  // Execute the query with billingInfo, paymentInfo, and userId as parameters
  connection.query(query, [JSON.stringify(billingInfo), JSON.stringify(paymentInfo), userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err});
    }

    // Send a success response if the update is successful
    res.json({ message: 'Payment info updated successfully' });
  });
});


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

app.post('/changesettings', function(req, res) {
  const { userId, username, email, currentpassword, password } = req.body;

  // Construct the SQL query to update User table with the given parameters
  let query = 'UPDATE User SET ';

  const queryParams = [];

  if (typeof username !== 'undefined') {
    query += ' username = ?,';
    queryParams.push(username);
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
        res.json({ token, user: user });
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
