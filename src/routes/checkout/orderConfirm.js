import React from 'react';
import AppNavbar from '../../components/navbar'; // Import the AppNavbar component
import { Container, Row, Col, Alert, Button } from 'react-bootstrap'; // Import React Bootstrap components
import './orderConfirm.css'; // Import your custom CSS for additional styling

function OrderConfirm() {
  return (
    <div>
      <AppNavbar />

      <Container className="order-confirmation">
        <Row>
          <Col md={6} className="confirmation-message">
            <h2>Thank You for Your Order</h2>
            <p>Your order has been successfully placed.</p>
            <p>Order Confirmation Number: <span className="order-number">123456</span></p>
          </Col>
          <Col md={6} className="order-details">
            <h3>Order Details</h3>
            <ul>
              <li>Item 1 - $19.99</li>
              <li>Item 2 - $29.99</li>
              {/* Include a list of purchased items */}
            </ul>
            <p>Total: <span className="total">$49.98</span></p>
            <h3>Shipping Address</h3>
            <p>John Doe<br />123 Main St<br />City, State, ZIP<br />Country</p>
            <h3>Expected Delivery Date</h3>
            <p>DD/MM/YYYY</p>
          </Col>
        </Row>
      </Container>

      <Container className="next-steps">
        <Row>
          <Col md={6}>
            <h3>What's Next?</h3>
            <p>An email confirmation with your order details and tracking information has been sent to your email address. You can use the provided tracking number to monitor your shipment's progress.</p>
          </Col>
          <Col md={6}>
            <Alert variant="success">
              <p>Your order is on its way!</p>
              <p>Track your order using the provided tracking number.</p>
            </Alert>
            <Button href="/">Continue Shopping</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default OrderConfirm;
