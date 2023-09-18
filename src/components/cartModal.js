// ShoppingCartModal.js
import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

const ShoppingCartModal = ({ show, onHide, cartItems }) => {

  const calculateTotal = () => {
    // Calculate the total price based on cart items
    let total = 0;
    for (const item of cartItems) {
      total += item.price * item.quantity;
    }
    return total.toFixed(2); // Format the total to two decimal places
  };

  const handleCheckout = () => {
    // Add your checkout logic here
    // For example, you can navigate to a checkout page or perform further actions
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
      <div style={{ maxHeight: '300px', overflowY: 'auto'}}>
        {/* Display cart items here */}
        {cartItems.map((item, index) => (
          <Row key={index} className="mb-3">
            <Col xs={3}>
              <img src={item.image} alt={item.name} className="img-fluid" />
            </Col>
            <Col xs={3}>
              <h6>{item.name}</h6>
              <p>Price: ${item.price.toFixed(2)}</p>
            </Col>  
            <Col xs={3}>
              <p>Quantity: {item.quantity}</p>
            </Col>
            <Col>
              <Button variant="danger">Remove</Button>
            </Col>
          </Row>
        ))}
        </div>
        )}
         {/* Display total */}
         {cartItems.length > 0 && <p>Total: ${calculateTotal()}</p>}
        
      </Modal.Body>
      <Modal.Footer>
      {cartItems.length > 0 && (
          <Button variant="primary" onClick={handleCheckout}>
            Checkout
          </Button>
        )}
        
      </Modal.Footer>
    </Modal>
  );
};

export default ShoppingCartModal;
