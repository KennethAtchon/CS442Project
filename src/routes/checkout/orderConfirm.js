import React, {useEffect} from 'react';
import AppNavbar from '../../components/navbar'; // Import the AppNavbar component
import { Container, Row, Col, Alert, Button, Card, ListGroup } from 'react-bootstrap'; // Import React Bootstrap components
import './orderConfirm.css'; // Import your custom CSS for additional styling
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOrder, getOrderProduct } from '../../actions/orderActions';

function OrderConfirm() {
  const { orderid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.orders);
  const shippinginfo = user ? JSON.parse(user.shipping_info) : orders.shippingInfo;

  useEffect(() => {
    
    if(Object.keys(orders.orderData).length === 0){
      dispatch(getOrder({orderId: orderid}))
      dispatch(getOrderProduct({orderId: orderid}))
    }

    if(Object.keys(shippinginfo).length === 0 && !user){
      navigate('/error')
    }

  })

  const handleContinue = () => {
    navigate('/')
  }

  return (
    <div>
      <AppNavbar />

      <Container className="order-confirmation">
        <Row>
          <Col md={6} className="confirmation-message">
            <h2>Thank You for Your Order</h2>
            <p>Your order has been successfully placed.</p>
            <p>Order Confirmation Number: <span className="order-number">{orderid}</span></p>
          </Col>
          <Col md={6}>
            <Card className="order-details-card">
              <Card.Header className="order-details-header">
                <h3>Order Details</h3>
              </Card.Header>
              <Card.Body>
                <ul>
                {orders.orderProduct && orders.orderProduct.map((item) => (
                  <li>{item.product_name}</li>
                ))}
                  {/* Include a list of purchased items */}
                </ul>
                <p>Total: <span className="total">${orders.orderData.total}</span></p>
                </Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h4>Shipping Address</h4>
                    <p>{shippinginfo.firstName} {shippinginfo.lastName}
                     <br />{shippinginfo.streetAddress}<br />
                     {shippinginfo.city}, {shippinginfo.state}, {shippinginfo.zip}
                     <br />{shippinginfo.countryRegion}</p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h4>Expected Delivery Date</h4>
                    <p>DD/MM/YYYY</p>
                  </ListGroup.Item>
                </ListGroup>
              
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="next-steps mb-3">
        <Row>
          <Col md={6}>
            <h3>What's Next?</h3>
            <p>An email confirmation with your order details and tracking information has been sent to your email address. You can use the provided tracking number to monitor your shipment's progress.</p>
          </Col>
          <Col md={6}>
            <Alert variant="success" className='mt-3'>
              <p>Your order is on its way!</p>
              <p>Track your order using the provided tracking number.</p>
            </Alert>
            <Button onClick={handleContinue}>Continue Shopping</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default OrderConfirm;
