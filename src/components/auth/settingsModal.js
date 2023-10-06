import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { changeSettings } from '../../actions/authActions'; // Import your changeSettings action
import LoadingSpinner from '../loading/loadingSpinner';

const SettingsModal = ({ show, onHide }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch(); // Initialize useDispatch to dispatch actions
  const currentUser = useSelector(state => state.auth.user); // Get 

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setValidated(false);
    // Create an object with the data to send to the action
    
    const settingsData = {
      userId: currentUser.user_id, // Assuming userId is part of the user data
      name: name === '' ? undefined : name,
      email: email === '' ? undefined : email,
      currentpassword: password === '' ? undefined : password,
      password: newPassword === '' ? undefined : newPassword,
    };

    setIsLoading(true);

    // Dispatch the changeSettings action with the settingsData
    dispatch(changeSettings(settingsData)).then(() => {
      console.log("Changed");
      setIsLoading(false);
      setValidated(true);
      setPasswordError(false);

    })
    .catch(() => {
      console.log("Error with API")
      setIsLoading(false);
      setValidated(true);
      setPasswordError(true);
    })

  };


  return (
    <Modal show={show} onHide={onHide}>
          { isLoading ? (
        <LoadingSpinner viewport={'30vh'} />
        ): (
        <Form noValidate validated={validated} onSubmit={handleSaveSettings}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form.Group  
          controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={passwordError}
            />
            <Form.Control.Feedback type="invalid">
            Current password is incorrect.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter a new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>

        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" type='submit'>
          Save Changes
        </Button>
        
      </Modal.Footer>
      </Form>
        )}
    </Modal>
  );
};

export default SettingsModal;
