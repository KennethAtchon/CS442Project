import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import AppNavbar from '../../components/navbar';
import ShippingInfo from '../../components/forms/shippingform'
import PaymentInfo from '../../components/forms/paymentform'
import './checkout.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder, OrderProductLink } from '../../actions/orderActions';


function Checkout() {
  const cartItems = useSelector((state) => state.cart.cart);
  const orders = useSelector((state) => state.orders);
  const user = useSelector((state) => state.auth.user);

  const calculateOrderTotal = () => {
    let total = 0;
    for (const item of cartItems) {
      total += item.price * item.quantity;
    }
    return total;
  };
  const total = calculateOrderTotal();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle form submission
  const handleCheckout = (e) => {
    e.preventDefault();

  console.log('user:', user);

  if(!user && (Object.keys(orders.paymentInfo).length === 0 || Object.keys(orders.shippingInfo).length === 0)){
    console.log("Please fill all the forms.")
    return;
  }

  if(cartItems.length === 0){
    console.log("Nothing in cart")
    return;
  }
  const currentDate = new Date();
  const currentDate2 = currentDate.toString()


  dispatch(createOrder({ date: currentDate2, userId: user ? user.user_id : undefined, total }))
  .then((orderid) => {

    // use order id to call a function create order and product link, 
    dispatch(OrderProductLink({orderid, cartItems}))

    navigate(`/checkout/${orderid}`)
    
  })
  .catch((error) => {
    console.error(error); // Handle the error
    // Show an error message or perform error handling as needed.
  });



    

    
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
              {cartItems.length === 0 ? (
                    <>
                      <div className="order-summary-item">
                        <div>Items:</div>
                        <div className="text-right">--</div>
                      </div>
                      <div className="order-summary-item">
                        <div>Shipping & handling:</div>
                        <div className="text-right">$10</div>
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
                    </>
                  ) : (
                    <>
                      <div className="order-summary-item">
                        <div>Items:</div>
                        <div className="text-right">${total.toFixed(2)}</div>
                      </div>
                      <div className="order-summary-item">
                        <div>Shipping & handling:</div>
                        <div className="text-right">$10</div>
                      </div>
                      <div className="order-summary-item">
                        <div>Total before tax:</div>
                        <div className="text-right">{(total + 10).toFixed(2)}</div>
                      </div>
                      <hr />
                      <div className="order-summary-item">
                        <div>Order total:</div>
                        <div className="text-right">${(total * 1.07 + 10).toFixed(2)}</div>
                      </div>
                    </>
                  )}
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
