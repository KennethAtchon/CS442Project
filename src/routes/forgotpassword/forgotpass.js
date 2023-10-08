import React, { useState } from 'react';
import AppNavbar from '../../components/navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import LoadingSpinner from '../../components/loading/loadingSpinner';
import {changePassword } from '../../actions/authActions';

function Forgotpass() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, token } = useParams();
  const user = useSelector((state) => state.auth.user);

  const [show, setShow] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotpass = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    

    // Add your logic here for handling password reset
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    
    
    if (form.checkValidity() === false) {
      
      e.stopPropagation();
      setValidated(true);
    }else{

      setValidated(true);
      setIsLoading(true);

      dispatch( changePassword({ email: email, token: token, password: newPassword, confirmpassword: confirmPassword}) )
      .then(() => {
        // Sign-up was successful, perform actions like clearing input fields and hiding modals
        setNewPassword('');
        setConfirmPassword('');
        navigate('/')
        

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
    <div>
      <AppNavbar />

      <Modal show={show} backdrop="static">
      { isLoading ? (
        <LoadingSpinner viewport={'30vh'} />
        ): (
        <Form noValidate validated={validated} onSubmit={handleForgotpass}>
          <Modal.Header>
            <Modal.Title>Forgot Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid new password.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid confirmation password.
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Change Password
            </Button>
          </Modal.Footer>
        </Form>
        )}
      </Modal>
    </div>
  );
}

export default Forgotpass;
