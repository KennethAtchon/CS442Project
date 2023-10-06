import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { signUp } from '../../actions/authActions';
import LoadingSpinner from '../loading/loadingSpinner';

const SignUpModal = ({ show, onHide, signinfunction, forgotpassfunction, loggedfunc }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      
      event.stopPropagation();
      setValidated(true);
    } else {

      setValidated(true);
      setIsLoading(true);

      dispatch(signUp(name, email, password))
      .then(() => {
        // Sign-up was successful, perform actions like clearing input fields and hiding modals
        setName('');
        setEmail('');
        setPassword('');
        onHide();

      })
      .catch((error) => {
        // Handle the error here (e.g., show an error message to the user)
        console.error('Sign-up failed:', error);
      }).finally(()=> {
        setIsLoading(false);
      })

      setValidated(false);


    }
  };

  return (
    <Modal show={show} onHide={onHide}>
          { isLoading ? (
        <LoadingSpinner viewport={'40vh'} />
        ): (
      <Form noValidate validated={validated} onSubmit={handleSignUp}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form.Group controlId="formBasicFirstName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          )}
    </Modal>
  );
};

export default SignUpModal;
