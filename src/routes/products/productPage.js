// ProductDetail.js
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AppNavbar from '../../components/navbar'; // Import the AppNavbar component
import ReviewSection from '../../components/reviews/reviewSection'
import Rating from 'react-rating-stars-component';
import { Container, Row, Col, Card, Button, Image, Form, ListGroup } from 'react-bootstrap';
import './productPage.css'; // Import the CSS file


const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL parameter
  const globalRating = 4.5;
  const [quantity, setQuantity] = useState(1);


  // Fetch the product information based on the ID or use the provided data
  // You can fetch the product information from an API or use a state management system like Redux.
  const product = {
    id: id,
    image: 'product1.jpg',
    name: 'Product Name',
    price: 99.99,
    variations: ['Small', 'Medium', 'Large'], // Example product variations
    isAvailable: true,
    estimatedDelivery: '2-3 business days', // Example estimated delivery time
  };

  const handleQuantityChange = (e) => {
    // Update the quantity when the user changes it
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleAddToCart = () => {
    // Implement your logic to add the product to the cart here
    console.log(`Added ${quantity} ${product.name} to the cart.`);
  };

  return (
    <>
    < AppNavbar />
    <Container className="mt-5">
      <Row>
        {/* Left Column: Large Product Image */}
        <Col>
          <Image
            src="../../football.jpg"
            alt="Product"
            className="img-fluid"
            
          />
        </Col>

        {/* Right Column: Product Details */}
        <Col>
          {/* Product Name */}
          <h2 className="product-name">Product Name</h2>
          {/* Sold by */}
          <p className="sold-by">Sold by: Seller Name</p>

          {/* Product Rating */}
          <div className="rating-container">  
                <Rating
                  value={globalRating}
                  edit={false}
                  isHalf={true}
                  activeColor="#FFD700"
                /> &nbsp; {globalRating}
              </div>

          <hr />
          {/* Product Description */}
          <p className="mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam sagittis arcu nec justo eleifend, eget condimentum
            turpis maximus.
          </p>
        </Col>
        <Col>
        <Card style={{ width: '18rem' }}>
      <Card.Header>Product Details</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <strong>Price:</strong> ${product.price.toFixed(2)}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Availability:</strong> {product.isAvailable ? 'In Stock' : 'Out of Stock'}
        </ListGroup.Item>
        {product.isAvailable && (
          <ListGroup.Item>
            <strong>Estimated Delivery:</strong> {product.estimatedDelivery}
          </ListGroup.Item>
        )}
      <ListGroup.Item>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <Form.Label style={{ marginRight: '10px' }}>Quantity:</Form.Label>
        </div>
        <div>
          <Form.Control
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
        </div>
      </div>
      </ListGroup.Item>
      
      <ListGroup.Item className="text-center">
      <Button
        variant="primary"
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button> 
      </ListGroup.Item>

      <ListGroup.Item className="text-center">
        <Link to="/checkout">
      <Button variant="success" >
          Checkout
        </Button> 
        </Link>
      </ListGroup.Item>

    </ListGroup>
    </Card>
        </Col>
      </Row>
    </Container>
      <ReviewSection />
    </>
  );
};

export default ProductPage;
