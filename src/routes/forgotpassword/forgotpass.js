import React, { useState } from 'react';
import AppNavbar from '../../components/navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';

function Forgotpass() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [show, setShow] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const handleForgotpass = (e) => {
    e.preventDefault();

    // Add your logic here for handling password reset
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Close the modal when done (you can remove this line if you want to keep it open)
    setShow(false);
  };

  return (
    <div>
      <AppNavbar />

      <Modal show={show} backdrop="static">
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
      </Modal>
    </div>
  );
}

export default Forgotpass;
