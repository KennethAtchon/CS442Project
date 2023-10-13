// ShoppingCartModal.js
import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateCart } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom';

const ShoppingCartModal = ({ show, onHide}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cart);

  const calculateTotal = () => {
    // Calculate the total price based on cart items
    let total = 0;
    for (const item of cartItems) {
      total += item.price * item.quantity;
    }
    return total.toFixed(2); // Format the total to two decimal places
  };

  const handleCheckout = () => {
    // Then, navigate to /checkout
    navigate('/checkout');

  };

  const handleRemoveItem = (index) => {
    // Dispatch the removeFromCart action with the index of the item to be removed
    dispatch(updateCart({userId: user ? user.user_id : undefined, removeIndex: index}));

  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {/* cartItems.length === 0  */}
      {cartItems.length === 0  ? (
          <p>Your cart is empty</p>
        ) : (
      <div style={{ maxHeight: '300px', overflowY: 'auto'}}>
        {/* Display cart items here */}
        {cartItems.map((item, index) => (
          <Row key={index} className="mb-3">
            <Col xs={3}>
              <img src={`../../${item.imageUrl}`} alt={item.product_name} className="img-fluid" />
            </Col>
            <Col xs={3}>
              <h6>{item.product_name}</h6>
              <p>Price: ${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
            </Col>  
            <Col xs={3}>
              <p>Quantity: {item.quantity}</p>
            </Col>
            <Col>
              <Button variant="danger" 
              onClick={() => handleRemoveItem(index)}
                >Remove</Button>
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
