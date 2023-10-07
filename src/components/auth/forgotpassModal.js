import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import LoadingSpinner from '../loading/loadingSpinner';
import { useDispatch } from 'react-redux';
import { SendForgotPassword } from '../../actions/authActions';

const ForgotPasswordModal = ({ show, onHide, signinfunction, signupfunction }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      
      event.stopPropagation();
      setValidated(true);
    }else{

      setValidated(true);
      setIsLoading(true);

      dispatch( SendForgotPassword(email) )
      .then(() => {
        // Sign-up was successful, perform actions like clearing input fields and hiding modals
        setEmail('');
        onHide();

      })
      .catch((error) => {
        // Handle the error here (e.g., show an error message to the user)
        console.error('Sign-in failed:', error);
      }).finally(()=> {
        setIsLoading(false);
      })

      setValidated(false);
    }

    
  };

  return (
    <Modal show={show} onHide={onHide}>
    { isLoading ? (
        <LoadingSpinner viewport={'30vh'} />
        ): (
      <Form noValidate validated={validated} onSubmit={handleForgotPassword}>
      <Modal.Header closeButton>
        <Modal.Title>Forgot Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
              <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='link' onClick={() => {
          signinfunction();
          onHide(); // Close the modal
        }}>
          Already have an account?
        </Button>
        <Button variant='link' onClick={() => {
          signupfunction();
          onHide(); // Close the modal
        }}>
          Don't have an account?
        </Button>
        <Button variant="primary" onClick={handleForgotPassword}>
          Reset Password
        </Button>
      </Modal.Footer>
      </Form>
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;

