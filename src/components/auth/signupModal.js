import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SignUpModal = ({ show, onHide, signinfunction, forgotpassfunction  }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSignUp = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form noValidate validated={validated} onSubmit={handleSignUp}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form.Group controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
        forgotpassfunction();
        onHide(); // Close the modal
      }}>
        Forgot Password?
      </Button>

        <Button variant="primary" onClick={handleSignUp}>
          Sign Up
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SignUpModal;
