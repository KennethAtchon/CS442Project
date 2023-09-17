

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ForgotPasswordModal = ({ show, onHide, signinfunction, signupfunction }) => {
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);

  const handleForgotPassword = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Modal show={show} onHide={onHide}>
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
    </Modal>
  );
};

export default ForgotPasswordModal;

