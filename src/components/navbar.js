import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import { BsFillPersonFill } from 'react-icons/bs'; // Import the icon you want to use for the profile icon
import SignInModal from './auth/signinModal';
import SignUpModal from './auth/signupModal';
import ForgotPasswordModal from './auth/forgotpassModal'; // Import the ForgotPasswordModal component
import SearchBar from './searchbar'
import './navbar.css'


function AppNavbar() {
    const [loggedIn, setLoggedIn] = useState(false); // Assuming you have a way to track login status

    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); // Add state for the forgot password modal

    const handleSignIn = () =>{
    setShowSignInModal(true);
    }

    const handleSignInModalClose = () => {
      setShowSignInModal(false);
    };

    const handleSignUp = () => {
      setShowSignUpModal(true); // Use the same variable for the signup modal
    };
    const handleSignUpModalClose = () => {
      setShowSignUpModal(false); // Use the same variable for closing the signup modal
    };

    const handleForgotPassword = () => {
      setShowForgotPasswordModal(true); // Function to open the forgot password modal
    };
  
    const handleForgotPasswordModalClose = () => {
      setShowForgotPasswordModal(false); // Function to close the forgot password modal
    };
  
    return (
      <div>
      <Navbar bg='light' expand="lg">
        <Navbar.Brand href='home'>Courtside Carts</Navbar.Brand> 
        <SearchBar className="navbarsearchbar" /> 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />  
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" >
            <Link to="/" className="navlink">
              Home
            </Link>
            <Link to="/faq" className="navlink">
              FAQ
            </Link>
          </Nav>
          {loggedIn ? (
            <Nav>
              <NavDropdown title={<BsFillPersonFill style={{ marginLeft: '10px'}} />} id="basic-nav-dropdown">
                <NavDropdown.Item href="my-products">My Products</NavDropdown.Item>
                <NavDropdown.Item href="my-reviews">My Reviews</NavDropdown.Item>
                <NavDropdown.Item href="change-settings">Change Settings</NavDropdown.Item>
                <NavDropdown.Item href="change-settings">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
              <BsFillPersonFill color='black' style={{ marginLeft: '10px'}} onClick={handleSignIn} />

              

          )}
        </Navbar.Collapse>
      </Navbar>

      <SignInModal show={showSignInModal} onHide={handleSignInModalClose} signupfunction={handleSignUp}forgotpassfunction={handleForgotPassword} />

      <SignUpModal  show={showSignUpModal} onHide={handleSignUpModalClose} signinfunction={handleSignIn} forgotpassfunction={handleForgotPassword} />

      <ForgotPasswordModal show={showForgotPasswordModal} onHide={handleForgotPasswordModalClose} signinfunction={handleSignIn} signupfunction={handleSignUp} />

      <div className="navbar-separator-bar"></div>

      <Navbar bg="light"  className="mini-navbar">
        <Nav className="mx-auto">
          <Link to="/products" className="nav-category">
            Basketball
          </Link>
          <Link to="/products" className="nav-category">
            Soccer
          </Link>
          <Link to="/products" className="nav-category">
            Tennis
          </Link>
          <Link to="/products" className="nav-category">
            Swimming
          </Link>
          <Link to="/products" className="nav-category">
            Football
          </Link>
          <Link to="/products" className="nav-category">
            Fishing
          </Link>
          
        </Nav>
      </Navbar>

      <div className="navbar-separator-bar"></div>

      </div>
    );
  }
  
  export default AppNavbar;
  