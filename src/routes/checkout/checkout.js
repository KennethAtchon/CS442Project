import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import AppNavbar from '../../components/navbar';
import './checkout.css';

function Checkout() {
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  // Function to handle form submission
  const handleCheckout = (e) => {
    e.preventDefault();

    // You can implement your checkout logic here
    // Calculate the order total, validate addresses, process payment, etc.

    // Once the order is successfully placed, you can navigate to the order confirmation page
    // Example: history.push('/order-confirmation');
  };

  return (
    <div>
      <AppNavbar />

      <Container className="checkout">
        <Row>
          <Col md={6}>
            <h2>Shipping Address</h2>
            <Form>
              {/* Shipping Address Form Fields */}
              <Form.Group controlId="shippingName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                  required
                />
              </Form.Group>

              {/* More shipping address fields (e.g., address line, city, state, ZIP) */}
              {/* ...

              For each field, update the shippingAddress state accordingly
              */}

              <Button variant="primary" type="submit" onClick={handleCheckout}>
                Continue to Billing
              </Button>
            </Form>
          </Col>

          <Col md={6}>
            <h2>Billing Address</h2>
            <Form>
              {/* Billing Address Form Fields */}
              {/* Similar to shipping address fields */}
            </Form>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <h2>Payment Method</h2>
            <Form>
              {/* Payment Method Options */}
              <Form.Group controlId="paymentMethod">
                <Form.Check
                  type="radio"
                  label="Credit/Debit Card"
                  name="paymentMethod"
                  value="credit_card"
                  checked={paymentMethod === 'credit_card'}
                  onChange={() => setPaymentMethod('credit_card')}
                />
                <Form.Check
                  type="radio"
                  label="PayPal"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                />
                {/* Add more payment options */}
              </Form.Group>
            </Form>
          </Col>

          <Col md={6}>
            <h2>Order Summary</h2>
            {/* Display a summary of items in the cart */}
            {/* Calculate and display the order total */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Checkout;
