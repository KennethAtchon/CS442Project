import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import AppNavbar from '../../components/navbar';
import ShippingInfo from '../../components/forms/shippingform'
import PaymentInfo from '../../components/forms/paymentform'
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
          <Col xs={8}>
          <ShippingInfo />
          </Col>
          <Col >
          <Card>
              <Card.Header className="d-flex justify-content-center align-items-center">
                <Button variant="primary" onClick={handleCheckout} >
                  Confirm Order
                </Button>
              </Card.Header>
              <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <Card.Text>
              <div className="order-summary-item">
                    <div>Items:</div>
                    <div className="text-right">$29.68</div>
                  </div>
                  <div className="order-summary-item">
                    <div>Shipping & handling:</div>
                    <div className="text-right">--</div>
                  </div>
                  <div className="order-summary-item">
                    <div>Total before tax:</div>
                    <div className="text-right">--</div>
                  </div>
                  <hr />
                  <div className="order-summary-item">
                    <div>Order total:</div>
                    <div className="text-right">--</div>
                  </div>
              </Card.Text>
            </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={8}>
            <PaymentInfo/>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Checkout;
